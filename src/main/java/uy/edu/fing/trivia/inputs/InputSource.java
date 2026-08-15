package uy.edu.fing.trivia.inputs;

import uy.edu.fing.trivia.domain.InputEvent;

import java.util.concurrent.BlockingQueue;

public interface InputSource {
    void start(BlockingQueue<InputEvent> queue);
}
