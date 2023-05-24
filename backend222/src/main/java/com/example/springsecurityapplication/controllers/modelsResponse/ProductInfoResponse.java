package com.example.springsecurityapplication.controllers.modelsResponse;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductInfoResponse {
    private int id;
    private String title;
    private String description;
    private float price;
    private String warehouse;
    private String seller;
    private String category;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateTime;
    private List<ImageInfoResponse> imageList = new ArrayList<>();
}
