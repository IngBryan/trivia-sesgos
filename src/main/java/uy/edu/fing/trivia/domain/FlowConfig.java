package uy.edu.fing.trivia.domain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import uy.edu.fing.trivia.domain.steps.*;

import java.util.List;

@Configuration
public class FlowConfig {

    @Bean
    List<Step> flow(AttractStep attract, IntroStep intro,
                    QuestionLoopStep question, FeedbackStep feedback) {
        return List.of(attract, intro, question, feedback);
    }
}
