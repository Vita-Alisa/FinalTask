package com.example.springsecurityapplication.controllers.modelsRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserRequest {

    private String login;

    private String password;
}
