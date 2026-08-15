package uy.edu.fing.trivia.domain;

public sealed interface Outcome {
    record Stay()            implements Outcome {}
    record Next()            implements Outcome {}
    record Goto(String step) implements Outcome {}
}
