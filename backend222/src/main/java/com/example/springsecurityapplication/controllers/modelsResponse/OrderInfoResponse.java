package com.example.springsecurityapplication.controllers.modelsResponse;

import com.example.springsecurityapplication.enumm.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class OrderInfoResponse {
    private int id;
    private String number;
    public ProductInfoResponse product;
    private String login;
    private int count;
    private float price;
    private LocalDateTime dateTime;
    private Status status;
}
