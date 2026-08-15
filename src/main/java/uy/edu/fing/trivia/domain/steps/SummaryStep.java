package uy.edu.fing.trivia.domain.steps;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.*;
import uy.edu.fing.trivia.persistence.*;

import java.util.List;

@Component
public class SummaryStep implements Step {

    @Override
    public String name() {
        return "SUMMARY";
    }

    @Override
    public void onEnter(FlowContext ctx) {}

    @Override
    public Outcome handle(InputEvent ev, FlowContext ctx) {
        ctx.clear();
        return new Outcome.Goto("ATTRACT");
    }

    @Override
    public ScreenState view(FlowContext ctx) {
        List<Answer> answers = ctx.get("answers");

        int correctCount = 0;
        List<SummaryPayload.QuestionSummary> summaries = new java.util.ArrayList<>();

        for (Answer a : answers) {
            Question q = a.getQuestion();
            Option correct = q.getCorrect();
            boolean isCorrect = correct != null && correct.getId().equals(a.getOption().getId());
            if (isCorrect) correctCount++;

            summaries.add(new SummaryPayload.QuestionSummary(
                    q.getText(),
                    a.getOption().getText(),
                    isCorrect
            ));
        }

        var payload = new SummaryPayload(answers.size(), correctCount, summaries);
        return ScreenState.of("SUMMARY", payload, "fade");
    }
}
