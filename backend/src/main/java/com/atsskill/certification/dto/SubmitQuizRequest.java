package com.atsskill.certification.dto;

import java.util.List;
import java.util.Map;

public class SubmitQuizRequest {
    // Map of questionId -> List of selectedOptionIds
    private Map<String, List<String>> answers;

    public SubmitQuizRequest() {
    }

    public SubmitQuizRequest(Map<String, List<String>> answers) {
        this.answers = answers;
    }

    public Map<String, List<String>> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String, List<String>> answers) {
        this.answers = answers;
    }
}
