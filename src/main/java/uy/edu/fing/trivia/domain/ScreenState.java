package uy.edu.fing.trivia.domain;

public record ScreenState(
    long   version,
    String screen,
    Object payload,
    String transition
) {
    public static ScreenState of(String screen, Object payload, String transition) {
        return new ScreenState(System.nanoTime(), screen, payload, transition);
    }

    public static ScreenState of(String screen) {
        return of(screen, null, "fade");
    }
}
