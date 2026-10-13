package com.atsskill.certification.model;

import java.util.ArrayList;
import java.util.List;

public class QuestionSnapshot {
    private String id;
    private String questionText;
    private List<QuestionOption> options = new ArrayList<>();
    private List<String> correctOptionIds = new ArrayList<>();

    public QuestionSnapshot() {
    }

    public QuestionSnapshot(String id, String questionText, List<QuestionOption> options, List<String> correctOptionIds) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctOptionIds = correctOptionIds;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public List<QuestionOption> getOptions() {
        return options;
    }

    public void setOptions(List<QuestionOption> options) {
        this.options = options;
    }

    public List<String> getCorrectOptionIds() {
        return correctOptionIds;
    }

    public void setCorrectOptionIds(List<String> correctOptionIds) {
        this.correctOptionIds = correctOptionIds;
    }
}
