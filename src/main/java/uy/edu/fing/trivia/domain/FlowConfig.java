package uy.edu.fing.trivia.domain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import uy.edu.fing.trivia.domain.steps.*;

import java.util.List;

@Configuration
public class FlowConfig {

    @Bean
    List<Step> flow(AttractStep attract,
                    QuestionLoopStep question, FeedbackStep feedback) {
        return List.of(attract, question, feedback);
    }
}
