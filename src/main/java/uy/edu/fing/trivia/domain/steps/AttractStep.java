package uy.edu.fing.trivia.domain.steps;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.*;

@Component
public class AttractStep implements Step {

    @Override
    public String name() {
        return "ATTRACT";
    }

    @Override
    public void onEnter(FlowContext ctx) {}

    @Override
    public Outcome handle(InputEvent ev, FlowContext ctx) {
        // cualquier tecla arranca
        return new Outcome.Next();
    }

    @Override
    public ScreenState view(FlowContext ctx) {
        return ScreenState.of("ATTRACT");
    }
}
