package uy.edu.fing.trivia.domain.steps;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.*;
import uy.edu.fing.trivia.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
public class QuestionLoopStep implements Step {

    private static final int GENDER_QUESTIONS_PER_GAME = 5;
    private static final int INCO_QUESTIONS_PER_GAME = 3;

    private final QuestionRepository questionRepo;
    private final AnswerRepository answerRepo;

    public QuestionLoopStep(QuestionRepository questionRepo,
                            AnswerRepository answerRepo) {
        this.questionRepo = questionRepo;
        this.answerRepo = answerRepo;
    }

    @Override
    public String name() {
        return "QUESTION";
    }

    @Override
    public void onEnter(FlowContext ctx) {
        List<Question> existing = ctx.get("questions");
        if (existing == null) {
            // Primera vez: cargar todo, intercalando una pregunta de cada tipo
            boolean inco = ModeSelectStep.INCO.equals(ctx.get(ModeSelectStep.MODE_KEY));
            String type = inco ? "INVESTIGACION" : "SESGO";
            int perGame = inco ? INCO_QUESTIONS_PER_GAME : GENDER_QUESTIONS_PER_GAME;
            // El orden dentro del tipo ya es aleatorio: cada partida toma un subconjunto distinto
            List<Question> all = interleaveByType(questionRepo.findAll().stream()
                    .filter(q -> type.equals(q.getType()))
                    .toList()).stream().limit(perGame).toList();
            ctx.put("questions", all);
            ctx.put("questionIndex", 0);
            ctx.put("answers", new ArrayList<Answer>());
            shuffleOptions(all.getFirst(), ctx);
        } else {
            // Volviendo desde Feedback: shuffle la pregunta actual
            shuffleOptions(currentQuestion(ctx), ctx);
        }
        ctx.put("shownAt", Instant.now());
    }

    @Override
    public Outcome handle(InputEvent ev, FlowContext ctx) {
        if (!"SELECT".equals(ev.type())) {
            return new Outcome.Stay();
        }

        int selection;
        try {
            selection = Integer.parseInt(ev.value());
        } catch (NumberFormatException e) {
            return new Outcome.Stay();
        }

        List<Option> shownOptions = ctx.get("shownOptions");
        if (selection < 0 || selection >= shownOptions.size()) {
            return new Outcome.Stay();
        }

        // Save answer
        Question currentQuestion = currentQuestion(ctx);
        Option chosen = shownOptions.get(selection);
        Instant shownAt = ctx.get("shownAt");
        Instant now = Instant.now();

        Answer answer = new Answer();
        answer.setQuestion(currentQuestion);
        answer.setOption(chosen);
        answer.setShownPosition(selection);
        answer.setShownAt(shownAt);
        answer.setAnsweredAt(now);
        answer.setLatencyMs(now.toEpochMilli() - shownAt.toEpochMilli());
        answer.setInputSource(ev.source());
        answerRepo.save(answer);

        // Track answer in context for feedback
        List<Answer> answers = ctx.get("answers");
        answers.add(answer);

        return new Outcome.Next(); // → FEEDBACK
    }

    @Override
    public ScreenState view(FlowContext ctx) {
        Question q = currentQuestion(ctx);
        List<Option> shownOptions = ctx.get("shownOptions");
        int index = ctx.get("questionIndex");
        List<Question> questions = ctx.get("questions");

        List<QuestionPayload.OptionDto> dtos = shownOptions.stream()
                .map(o -> new QuestionPayload.OptionDto(o.getId(), o.getText()))
                .toList();

        var payload = new QuestionPayload(index + 1, questions.size(), q.getType(), q.getText(), dtos);
        return ScreenState.of("QUESTION", payload, "slideLeft");
    }

    private Question currentQuestion(FlowContext ctx) {
        List<Question> questions = ctx.get("questions");
        int index = ctx.get("questionIndex");
        return questions.get(index);
    }

    /**
     * Intercala las preguntas por tipo (una de cada tipo por vuelta). El orden dentro de cada
     * tipo se mezcla al azar en cada partida, para que varias pantallas de un mismo grupo de
     * investigación (ej. SIS con 3 problemáticas) no queden agrupadas por el orden de carga.
     */
    private List<Question> interleaveByType(List<Question> questions) {
        Map<String, List<Question>> byType = new LinkedHashMap<>();
        for (Question q : questions) {
            byType.computeIfAbsent(q.getType(), k -> new ArrayList<>()).add(q);
        }
        List<List<Question>> groups = new ArrayList<>(byType.values());
        groups.forEach(Collections::shuffle);

        List<Question> result = new ArrayList<>(questions.size());
        int index = 0;
        boolean added;
        do {
            added = false;
            for (List<Question> group : groups) {
                if (index < group.size()) {
                    result.add(group.get(index));
                    added = true;
                }
            }
            index++;
        } while (added);

        return result;
    }

    private void shuffleOptions(Question q, FlowContext ctx) {
        List<Option> options = new ArrayList<>(q.getOptions());
        Collections.shuffle(options);
        ctx.put("shownOptions", options);
    }

}
