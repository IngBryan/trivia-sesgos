package uy.edu.fing.trivia.domain.steps;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.*;

@Component
public class ModeSelectStep implements Step {

    public static final String MODE_KEY = "mode";
    public static final String GENDER = "GENERO";
    public static final String INCO = "INCO";

    @Override
    public String name() {
        return "MODE_SELECT";
    }

    @Override
    public void onEnter(FlowContext ctx) {
        ctx.clear();
    }

    @Override
    public Outcome handle(InputEvent ev, FlowContext ctx) {
        if (!"SELECT".equals(ev.type())) {
            return new Outcome.Stay();
        }
        return switch (ev.value()) {
            case "0" -> {
                ctx.put(MODE_KEY, GENDER);
                yield new Outcome.Goto("ATTRACT");
            }
            case "1" -> {
                ctx.put(MODE_KEY, INCO);
                yield new Outcome.Goto("INCO_ATTRACT");
            }
            default -> new Outcome.Stay();
        };
    }

    @Override
    public ScreenState view(FlowContext ctx) {
        return ScreenState.of("MODE_SELECT");
    }
}
