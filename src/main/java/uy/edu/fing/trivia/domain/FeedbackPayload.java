package uy.edu.fing.trivia.domain;

import java.util.List;

public record FeedbackPayload(
    int index,
    int total,
    String type,
    String questionText,
    String chosenText,
    String correctText,       // null si no hay respuesta correcta (p.ej. tipo INVESTIGACION)
    boolean correct,
    String groupName,         // solo tipo INVESTIGACION
    String groupDescription,  // solo tipo INVESTIGACION
    List<String> photoPaths   // solo tipo INVESTIGACION, puede tener varias fotos
) {}
