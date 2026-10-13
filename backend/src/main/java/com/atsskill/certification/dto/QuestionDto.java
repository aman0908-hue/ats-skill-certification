package com.atsskill.certification.dto;

import com.atsskill.certification.model.Question;
import com.atsskill.certification.model.QuestionOption;
import com.atsskill.certification.model.QuestionSnapshot;

import java.util.List;

public class QuestionDto {
    private String id;
    private String questionText;
    private List<QuestionOption> options;

    public QuestionDto() {
    }

    public QuestionDto(String id, String questionText, List<QuestionOption> options) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
    }

    public static QuestionDto fromSnapshot(QuestionSnapshot qs) {
        return new QuestionDto(qs.getId(), qs.getQuestionText(), qs.getOptions());
    }

    public static QuestionDto fromEntity(Question q) {
        return new QuestionDto(q.getId(), q.getQuestionText(), q.getOptions());
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public List<QuestionOption> getOptions() { return options; }
    public void setOptions(List<QuestionOption> options) { this.options = options; }
}
