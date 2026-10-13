package com.atsskill.certification.dto;

import com.atsskill.certification.model.Question;
import com.atsskill.certification.model.QuestionOption;

import java.util.List;

public class QuestionAdminDto {
    private String id;
    private String courseId;
    private String questionText;
    private List<QuestionOption> options;
    private List<String> correctOptionIds;
    private String explanation;
    private String difficulty;
    private boolean active;

    public QuestionAdminDto() {
    }

    public static QuestionAdminDto fromEntity(Question q) {
        QuestionAdminDto dto = new QuestionAdminDto();
        dto.id = q.getId();
        dto.courseId = q.getCourseId();
        dto.questionText = q.getQuestionText();
        dto.options = q.getOptions();
        dto.correctOptionIds = q.getCorrectOptionIds();
        dto.explanation = q.getExplanation();
        dto.difficulty = q.getDifficulty();
        dto.active = q.isActive();
        return dto;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }
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
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
