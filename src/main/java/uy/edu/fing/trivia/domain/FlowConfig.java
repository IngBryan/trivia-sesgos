package uy.edu.fing.trivia.domain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import uy.edu.fing.trivia.domain.steps.*;

import java.util.List;

@Configuration
public class FlowConfig {

    @Bean
    List<Step> flow(ModeSelectStep modeSelect, AttractStep attract, IncoAttractStep incoAttract,
                    QuestionLoopStep question, FeedbackStep feedback, ThanksStep thanks) {
        return List.of(modeSelect, attract, incoAttract, question, feedback, thanks);
    }
}
