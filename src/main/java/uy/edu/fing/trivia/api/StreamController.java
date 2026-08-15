package uy.edu.fing.trivia.api;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import uy.edu.fing.trivia.stream.ScreenBroadcaster;

@RestController
@RequestMapping("/api")
public class StreamController {

    private final ScreenBroadcaster broadcaster;

    public StreamController(ScreenBroadcaster broadcaster) {
        this.broadcaster = broadcaster;
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        broadcaster.register(emitter);
        return emitter;
    }
}
