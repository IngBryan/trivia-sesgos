package uy.edu.fing.trivia.domain.steps;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.*;

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
        return ScreenState.of("THANKS");
    }
}
