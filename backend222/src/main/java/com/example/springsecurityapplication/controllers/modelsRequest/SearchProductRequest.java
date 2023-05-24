package com.example.springsecurityapplication.controllers.modelsRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchProductRequest {
    private String search;
    private String otPrice;
    private String doPrice;
    private String price;
    private int contract;
}