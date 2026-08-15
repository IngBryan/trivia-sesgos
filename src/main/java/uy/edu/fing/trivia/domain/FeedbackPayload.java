package uy.edu.fing.trivia.domain;

public record FeedbackPayload(
    int index,
    int total,
    String questionText,
    String chosenText,
    String correctText,   // null si no hay respuesta correcta
    boolean correct
) {}
