package uy.edu.fing.trivia.domain;

public interface Step {

    String name();

    void onEnter(FlowContext ctx);

    Outcome handle(InputEvent ev, FlowContext ctx);

    ScreenState view(FlowContext ctx);

    default void onExit(FlowContext ctx) {}
}
