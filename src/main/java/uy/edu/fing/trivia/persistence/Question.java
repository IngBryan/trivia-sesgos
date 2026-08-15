package uy.edu.fing.trivia.persistence;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ManyToOne
    @JoinColumn(name = "correct_id")
    private Option correct;

    @OneToMany(mappedBy = "question", fetch = FetchType.EAGER)
    private List<Option> options;

    public Long getId() { return id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public Option getCorrect() { return correct; }
    public void setCorrect(Option correct) { this.correct = correct; }

    public List<Option> getOptions() { return options; }
    public void setOptions(List<Option> options) { this.options = options; }
}
