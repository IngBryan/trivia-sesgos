package uy.edu.fing.trivia.domain;

public record InputEvent(String type, String value, String source) {

    public static InputEvent fromKeyboard(String type, String value) {
        return new InputEvent(type, value, "keyboard");
    }

    public static InputEvent fromSerial(String type, String value) {
        return new InputEvent(type, value, "serial");
    }
}
