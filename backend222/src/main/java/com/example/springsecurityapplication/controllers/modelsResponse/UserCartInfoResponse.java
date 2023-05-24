package com.example.springsecurityapplication.controllers.modelsResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCartInfoResponse {
    private int id;
    private int personId;
    private ProductInfoResponse product;
}
