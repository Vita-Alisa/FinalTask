package com.example.springsecurityapplication.controllers.modelsResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageInfoResponse {
    private int id;
    private String fileName;

    public ImageInfoResponse(){
    }
    public ImageInfoResponse(String fileName){
        this.fileName = fileName;
    }
}
