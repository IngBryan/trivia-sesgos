package uy.edu.fing.trivia.domain.steps;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.*;
import uy.edu.fing.trivia.persistence.*;

import java.util.List;

@Component
public class FeedbackStep implements Step {

    @Override
    public String name() {
        return "FEEDBACK";
    }

    @Override
    public void onEnter(FlowContext ctx) {}

    @Override
    public Outcome handle(InputEvent ev, FlowContext ctx) {
        int index = ctx.get("questionIndex");
        List<Question> questions = ctx.get("questions");

        if (index + 1 < questions.size()) {
            ctx.put("questionIndex", index + 1);
            return new Outcome.Goto("QUESTION");
        }

        // No quedan más preguntas → volver al inicio
        ctx.clear();
        return new Outcome.Goto("ATTRACT");
    }

    @Override
    public ScreenState view(FlowContext ctx) {
        List<Answer> answers = ctx.get("answers");
        List<Question> questions = ctx.get("questions");
        Answer last = answers.getLast();
        Question q = last.getQuestion();
        Option correct = q.getCorrect();

        boolean isCorrect = correct != null
                && correct.getId().equals(last.getOption().getId());

        var payload = new FeedbackPayload(
                (int) ctx.get("questionIndex") + 1,
                questions.size(),
                q.getText(),
                last.getOption().getText(),
                correct != null ? correct.getText() : null,
                isCorrect
        );
        return ScreenState.of("FEEDBACK", payload, "fade");
    }
}
