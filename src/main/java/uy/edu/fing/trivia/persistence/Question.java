package uy.edu.fing.trivia.persistence;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    /**
     * Tipo de pregunta: determina cómo se renderiza en el frontend.
     * "SESGO" (default): completar frase, se compara la elección contra la respuesta de la IA.
     * "INVESTIGACION": elegir una problemática, la siguiente pantalla muestra el grupo de investigación asociado.
     */
    private String type = "SESGO";

    @ManyToOne
    @JoinColumn(name = "correct_id")
    private Option correct;

    @OneToMany(mappedBy = "question", fetch = FetchType.EAGER)
    private List<Option> options;

    public Long getId() { return id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Option getCorrect() { return correct; }
    public void setCorrect(Option correct) { this.correct = correct; }

    public List<Option> getOptions() { return options; }
    public void setOptions(List<Option> options) { this.options = options; }
}
