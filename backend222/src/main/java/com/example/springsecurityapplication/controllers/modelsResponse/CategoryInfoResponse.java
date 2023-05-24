package com.example.springsecurityapplication.controllers.modelsResponse;

import lombok.Getter;
import lombok.Setter;

@Getter

@Setter
public class CategoryInfoResponse {
    private int id;
    private String name;

    public CategoryInfoResponse() {
    }

    public CategoryInfoResponse(String name) {
        this.name = name;
    }

    public CategoryInfoResponse(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
