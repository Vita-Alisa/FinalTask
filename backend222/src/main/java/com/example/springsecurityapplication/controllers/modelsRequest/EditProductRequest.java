package com.example.springsecurityapplication.controllers.modelsRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditProductRequest {
    private String title;
    private String description;
    private float price;
    private String warehouse;
    private String seller;
    private int categoryId;
}
