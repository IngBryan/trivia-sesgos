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
    private int savedIndex   = -1;   // índice guardado al entrar a info-overlay

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
                    if (handleInfoToggle(ev)) {
                        broadcaster.send(currentStep().view(ctx));
                        continue;
                    }
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

    /**
     * Maneja la tecla "i" (solo teclado) para hacer toggle a la pantalla inicial.
     * No llama onEnter/onExit para preservar el estado exacto de la pregunta.
     * Mientras estamos en overlay (savedIndex >= 0) consume también cualquier
     * otra tecla para que ATTRACT no avance el flujo normal.
     * @return true si el evento fue consumido y no debe procesarse más.
     */
    private boolean handleInfoToggle(InputEvent ev) {
        boolean atAttract = "ATTRACT".equals(currentStep().name());

        // Bloquear cualquier tecla mientras estamos en overlay
        if (atAttract && savedIndex >= 0 && !"keyboard".equals(ev.source())) {
            return true;
        }

        if (!"keyboard".equals(ev.source()) || !"i".equalsIgnoreCase(ev.value())) {
            // Si estamos en overlay con teclado y no es "i", bloquear también
            return atAttract && savedIndex >= 0;
        }

        if (!atAttract) {
            // Ir a la pantalla inicial, guardar posición
            savedIndex = currentIndex;
            currentIndex = indexOfStep("ATTRACT");
        } else if (savedIndex >= 0) {
            // Volver a donde estábamos
            currentIndex = savedIndex;
            savedIndex = -1;
        }
        // Si atAttract y sin savedIndex: inicio natural de la app, ignorar
        return true;
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

    private int indexOfStep(String name) {
        for (int i = 0; i < flow.size(); i++) {
            if (flow.get(i).name().equals(name)) return i;
        }
        return 0;
    }
}
