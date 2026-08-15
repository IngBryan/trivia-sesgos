package uy.edu.fing.trivia.domain;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.inputs.InputSource;
import uy.edu.fing.trivia.stream.ScreenBroadcaster;

import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Component
public class FlowEngine implements ApplicationRunner {

    private final BlockingQueue<InputEvent> queue = new LinkedBlockingQueue<>();
    private final List<Step> flow;
    private final List<InputSource> sources;
    private final ScreenBroadcaster broadcaster;
    private final FlowContext ctx = new FlowContext();

    private int currentIndex = 0;

    public FlowEngine(List<Step> flow, List<InputSource> sources, ScreenBroadcaster broadcaster) {
        this.flow = flow;
        this.sources = sources;
        this.broadcaster = broadcaster;
    }

    @Override
    public void run(ApplicationArguments args) {
        sources.forEach(s -> s.start(queue));
        flow.getFirst().onEnter(ctx);
        broadcaster.send(currentStep().view(ctx));

        Thread.ofVirtual().name("flow-engine").start(() -> {
            while (true) {
                try {
                    InputEvent ev = queue.take();
                    Outcome outcome = currentStep().handle(ev, ctx);
                    apply(outcome);
                    broadcaster.send(currentStep().view(ctx));
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
    }

    public BlockingQueue<InputEvent> getQueue() {
        return queue;
    }

    private Step currentStep() {
        return flow.get(currentIndex);
    }

    private void apply(Outcome outcome) {
        switch (outcome) {
            case Outcome.Stay() -> {} // do nothing
            case Outcome.Next() -> moveTo(currentIndex + 1);
            case Outcome.Goto(String stepName) -> moveToByName(stepName);
        }
    }

    private void moveTo(int newIndex) {
        if (newIndex < 0 || newIndex >= flow.size()) {
            newIndex = 0; // wrap al inicio
        }
        currentStep().onExit(ctx);
        currentIndex = newIndex;
        currentStep().onEnter(ctx);
    }

    private void moveToByName(String name) {
        for (int i = 0; i < flow.size(); i++) {
            if (flow.get(i).name().equals(name)) {
                moveTo(i);
                return;
            }
        }
    }
}
