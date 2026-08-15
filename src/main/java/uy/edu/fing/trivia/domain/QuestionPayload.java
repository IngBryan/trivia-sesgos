package uy.edu.fing.trivia.domain;

import java.util.List;

public record QuestionPayload(
    int index,
    int total,
    String text,
    List<OptionDto> options
) {
    public record OptionDto(long id, String text) {}
}
