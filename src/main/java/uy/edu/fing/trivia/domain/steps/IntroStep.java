package uy.edu.fing.trivia.domain.steps;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.*;

@Component
public class IntroStep implements Step {

    @Override
    public String name() {
        return "INTRO";
    }

    @Override
    public void onEnter(FlowContext ctx) {}

    @Override
    public Outcome handle(InputEvent ev, FlowContext ctx) {
        // cualquier tecla avanza
        return new Outcome.Next();
    }

    @Override
    public ScreenState view(FlowContext ctx) {
        return ScreenState.of("INTRO");
    }
}
