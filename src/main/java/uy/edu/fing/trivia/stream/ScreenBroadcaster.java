package uy.edu.fing.trivia.stream;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import uy.edu.fing.trivia.domain.ScreenState;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class ScreenBroadcaster {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private volatile ScreenState estadoActual = ScreenState.of("ATTRACT");

    public void register(SseEmitter emitter) {
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError(err -> emitters.remove(emitter));
        enviarA(emitter, estadoActual);
    }

    public void send(ScreenState state) {
        this.estadoActual = state;
        for (SseEmitter emitter : emitters) {
            enviarA(emitter, state);
        }
    }

    public ScreenState getEstadoActual() {
        return estadoActual;
    }

    private void enviarA(SseEmitter emitter, ScreenState state) {
        try {
            emitter.send(SseEmitter.event().name("screen").data(state));
        } catch (IOException e) {
            emitters.remove(emitter);
        }
    }
}
