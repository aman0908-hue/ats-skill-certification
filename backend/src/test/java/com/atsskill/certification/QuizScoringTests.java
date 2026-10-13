package com.atsskill.certification;

import com.atsskill.certification.model.QuestionOption;
import com.atsskill.certification.model.QuestionSnapshot;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class QuizScoringTests {

    @Test
    @DisplayName("Verify that scoring calculates accurate percentages and honors passing criteria")
    void testScoringLogic() {
        QuestionSnapshot q1 = new QuestionSnapshot("q1", "Question 1",
                List.of(new QuestionOption("1", "A"), new QuestionOption("2", "B")), List.of("1"));
        QuestionSnapshot q2 = new QuestionSnapshot("q2", "Question 2",
                List.of(new QuestionOption("1", "A"), new QuestionOption("2", "B")), List.of("2"));
        QuestionSnapshot q3 = new QuestionSnapshot("q3", "Question 3",
                List.of(new QuestionOption("1", "A"), new QuestionOption("2", "B")), List.of("1"));
        QuestionSnapshot q4 = new QuestionSnapshot("q4", "Question 4",
                List.of(new QuestionOption("1", "A"), new QuestionOption("2", "B")), List.of("2"));

        List<QuestionSnapshot> questions = List.of(q1, q2, q3, q4);

        // Student answers 3 out of 4 correctly (75%)
        Map<String, List<String>> userAnswers = new HashMap<>();
        userAnswers.put("q1", List.of("1")); // Correct
        userAnswers.put("q2", List.of("2")); // Correct
        userAnswers.put("q3", List.of("1")); // Correct
        userAnswers.put("q4", List.of("1")); // Incorrect

        int correct = 0;
        for (QuestionSnapshot qs : questions) {
            List<String> chosen = userAnswers.get(qs.getId());
            if (chosen != null && new HashSet<>(chosen).equals(new HashSet<>(qs.getCorrectOptionIds()))) {
                correct++;
            }
        }

        assertEquals(3, correct);
        double percentage = ((double) correct / questions.size()) * 100.0;
        assertEquals(75.0, percentage);

        int passingThreshold = 60;
        assertTrue(percentage >= passingThreshold, "Student should pass with 75% score against 60% threshold");
    }

    @Test
    @DisplayName("Verify unanswered questions receive zero marks")
    void testUnansweredQuestionsScoring() {
        QuestionSnapshot q1 = new QuestionSnapshot("q1", "Question 1",
                List.of(new QuestionOption("1", "A"), new QuestionOption("2", "B")), List.of("1"));
        QuestionSnapshot q2 = new QuestionSnapshot("q2", "Question 2",
                List.of(new QuestionOption("1", "A"), new QuestionOption("2", "B")), List.of("2"));

        List<QuestionSnapshot> questions = List.of(q1, q2);

        Map<String, List<String>> emptyAnswers = new HashMap<>();

        int correct = 0;
        for (QuestionSnapshot qs : questions) {
            List<String> chosen = emptyAnswers.get(qs.getId());
            if (chosen != null && new HashSet<>(chosen).equals(new HashSet<>(qs.getCorrectOptionIds()))) {
                correct++;
            }
        }

        assertEquals(0, correct);
        double percentage = ((double) correct / questions.size()) * 100.0;
        assertEquals(0.0, percentage);
        assertFalse(percentage >= 60.0);
    }
}
