package uy.edu.fing.trivia.domain.steps;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.*;

@Component
public class IncoAttractStep implements Step {

    @Override
    public String name() {
        return "INCO_ATTRACT";
    }

    @Override
    public void onEnter(FlowContext ctx) {}

    @Override
    public Outcome handle(InputEvent ev, FlowContext ctx) {
        return new Outcome.Goto("QUESTION");
    }

    @Override
    public ScreenState view(FlowContext ctx) {
        return ScreenState.of("INCO_ATTRACT");
    }
}
