package uy.edu.fing.trivia.domain.steps;

import org.springframework.stereotype.Component;
import uy.edu.fing.trivia.domain.*;
import uy.edu.fing.trivia.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class QuestionLoopStep implements Step {

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
            // Primera vez: cargar todo
            List<Question> all = questionRepo.findAll();
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

        var payload = new QuestionPayload(index + 1, questions.size(), q.getText(), dtos);
        return ScreenState.of("QUESTION", payload, "slideLeft");
    }

    private Question currentQuestion(FlowContext ctx) {
        List<Question> questions = ctx.get("questions");
        int index = ctx.get("questionIndex");
        return questions.get(index);
    }

    private void shuffleOptions(Question q, FlowContext ctx) {
        List<Option> options = new ArrayList<>(q.getOptions());
        Collections.shuffle(options);
        ctx.put("shownOptions", options);
    }

}
