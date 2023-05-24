package com.example.springsecurityapplication.controllers.modelsResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResponse {
    private int id;
    private String login;
    private String role;
}
