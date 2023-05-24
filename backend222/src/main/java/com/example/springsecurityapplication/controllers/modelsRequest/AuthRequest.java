package com.example.springsecurityapplication.controllers.modelsRequest;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthRequest {
    private String login;

    private String password;
}