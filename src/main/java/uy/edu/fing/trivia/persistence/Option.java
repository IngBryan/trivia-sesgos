package uy.edu.fing.trivia.persistence;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.List;

@Entity
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    private String text;

    // Usados solo cuando question.type = "INVESTIGACION": grupo asociado a esta problemática.
    private String groupName;

    @Column(length = 2000)
    private String groupDescription;

    // Una o más rutas de foto separadas por coma (se muestran en carrusel si hay más de una).
    private String photoPaths;

    public Long getId() { return id; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getGroupName() { return groupName; }
    public void setGroupName(String groupName) { this.groupName = groupName; }

    public String getGroupDescription() { return groupDescription; }
    public void setGroupDescription(String groupDescription) { this.groupDescription = groupDescription; }

    public String getPhotoPaths() { return photoPaths; }
    public void setPhotoPaths(String photoPaths) { this.photoPaths = photoPaths; }

    public List<String> getPhotoPathList() {
        if (photoPaths == null || photoPaths.isBlank()) {
            return List.of();
        }
        return Arrays.stream(photoPaths.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

}
