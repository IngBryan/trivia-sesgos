package uy.edu.fing.trivia.domain;

import java.util.List;

public record SummaryPayload(
    int totalQuestions,
    int correctCount,
    List<QuestionSummary> questions
) {
    public record QuestionSummary(
        String questionText,
        String chosenAnswer,
        boolean correct
    ) {}
}
