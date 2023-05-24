package com.example.springsecurityapplication.controllers.modelsRequest;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class AddProductImagesRequest {
    MultipartFile file_one;
    MultipartFile file_two;
    MultipartFile file_three;
    MultipartFile file_four;
    MultipartFile file_five;
}
