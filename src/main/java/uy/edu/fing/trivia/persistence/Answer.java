package uy.edu.fing.trivia.persistence;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @ManyToOne
    @JoinColumn(name = "option_id")
    private Option option;

    private int shownPosition; // 0, 1, 2

    private Instant shownAt;

    private Instant answeredAt;

    private long latencyMs;

    private String inputSource; // "keyboard" | "serial"

    public Long getId() { return id; }

public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public Option getOption() { return option; }
    public void setOption(Option option) { this.option = option; }

    public int getShownPosition() { return shownPosition; }
    public void setShownPosition(int shownPosition) { this.shownPosition = shownPosition; }

    public Instant getShownAt() { return shownAt; }
    public void setShownAt(Instant shownAt) { this.shownAt = shownAt; }

    public Instant getAnsweredAt() { return answeredAt; }
    public void setAnsweredAt(Instant answeredAt) { this.answeredAt = answeredAt; }

    public long getLatencyMs() { return latencyMs; }
    public void setLatencyMs(long latencyMs) { this.latencyMs = latencyMs; }

    public String getInputSource() { return inputSource; }
    public void setInputSource(String inputSource) { this.inputSource = inputSource; }
}
