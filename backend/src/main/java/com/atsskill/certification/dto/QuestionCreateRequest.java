package com.atsskill.certification.dto;

import com.atsskill.certification.model.QuestionOption;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class QuestionCreateRequest {

    @NotBlank(message = "Question text is required")
    private String questionText;

    @NotEmpty(message = "At least two options are required")
    private List<QuestionOption> options;

    @NotEmpty(message = "At least one correct option ID is required")
    private List<String> correctOptionIds;

    private String explanation;

    private String difficulty = "MEDIUM";

    public QuestionCreateRequest() {
    }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public List<QuestionOption> getOptions() { return options; }
    public void setOptions(List<QuestionOption> options) { this.options = options; }
    public List<String> getCorrectOptionIds() { return correctOptionIds; }
    public void setCorrectOptionIds(List<String> correctOptionIds) { this.correctOptionIds = correctOptionIds; }
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
