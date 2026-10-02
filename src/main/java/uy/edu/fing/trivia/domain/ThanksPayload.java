package uy.edu.fing.trivia.domain;

import java.util.List;

public record ThanksPayload(
    String mode,           // "GENERO" o "INCO"
    int total,             // preguntas respondidas
    int matches,           // GENERO: veces que coincidió con la IA
    List<String> groups    // INCO: grupos de investigación que conoció
) {}
