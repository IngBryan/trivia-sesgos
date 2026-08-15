package uy.edu.fing.trivia.inputs;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.InputEvent;

import java.util.concurrent.BlockingQueue;

@Component
public class KeyboardSource implements InputSource {

    private BlockingQueue<InputEvent> queue;

    @Override
    public void start(BlockingQueue<InputEvent> queue) {
        this.queue = queue;
    }

    public void enqueue(InputEvent event) {
        if (queue != null) {
            queue.offer(event);
        }
    }
}
