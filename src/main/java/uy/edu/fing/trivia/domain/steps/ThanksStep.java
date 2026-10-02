package uy.edu.fing.trivia.domain.steps;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.*;
import uy.edu.fing.trivia.persistence.Answer;
import uy.edu.fing.trivia.persistence.Option;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Component
public class ThanksStep implements Step {

    @Override
    public String name() {
        return "THANKS";
    }

    @Override
    public void onEnter(FlowContext ctx) {}

    @Override
    public Outcome handle(InputEvent ev, FlowContext ctx) {
        return new Outcome.Goto("MODE_SELECT");
    }

    @Override
    public ScreenState view(FlowContext ctx) {
        String mode = ModeSelectStep.INCO.equals(ctx.get(ModeSelectStep.MODE_KEY))
                ? ModeSelectStep.INCO
                : ModeSelectStep.GENDER;
        List<Answer> answers = ctx.get("answers");
        if (answers == null) {
            answers = List.of();
        }

        int matches = 0;
        Set<String> groups = new LinkedHashSet<>();
        for (Answer a : answers) {
            Option chosen = a.getOption();
            Option aiPick = a.getQuestion().getCorrect();
            if (aiPick != null && aiPick.getId().equals(chosen.getId())) {
                matches++;
            }
            if (chosen.getGroupName() != null) {
                groups.add(chosen.getGroupName());
            }
        }

        var payload = new ThanksPayload(mode, answers.size(), matches, new ArrayList<>(groups));
        return ScreenState.of("THANKS", payload, "fade");
    }
}
