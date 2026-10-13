package com.atsskill.certification.model;

public class FieldCoordinate {
    private double x; // in % or pt (percentage 0 - 100 makes responsive scaling exact)
    private double y; // in % or pt
    private int fontSize = 24;
    private String fontFamily = "Inter, sans-serif";
    private String color = "#0F172A";
    private String textAlign = "center"; // center, left, right
    private double maxWidthPercent = 80;

    public FieldCoordinate() {
    }

    public FieldCoordinate(double x, double y, int fontSize, String fontFamily, String color, String textAlign) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.color = color;
        this.textAlign = textAlign;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public int getFontSize() {
        return fontSize;
    }

    public void setFontSize(int fontSize) {
        this.fontSize = fontSize;
    }

    public String getFontFamily() {
        return fontFamily;
    }

    public void setFontFamily(String fontFamily) {
        this.fontFamily = fontFamily;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getTextAlign() {
        return textAlign;
    }

    public void setTextAlign(String textAlign) {
        this.textAlign = textAlign;
    }

    public double getMaxWidthPercent() {
        return maxWidthPercent;
    }

    public void setMaxWidthPercent(double maxWidthPercent) {
        this.maxWidthPercent = maxWidthPercent;
    }
}
