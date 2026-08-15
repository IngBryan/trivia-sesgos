package uy.edu.fing.trivia.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uy.edu.fing.trivia.domain.InputEvent;
import uy.edu.fing.trivia.inputs.KeyboardSource;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class InputController {

    private final KeyboardSource keyboardSource;

    public InputController(KeyboardSource keyboardSource) {
        this.keyboardSource = keyboardSource;
    }

    @PostMapping("/input")
    public ResponseEntity<Void> input(@RequestBody Map<String, String> body) {
        String type  = body.getOrDefault("type", "SELECT");
        String value = body.getOrDefault("value", "");
        keyboardSource.enqueue(InputEvent.fromKeyboard(type, value));
        return ResponseEntity.accepted().build();
    }
}
