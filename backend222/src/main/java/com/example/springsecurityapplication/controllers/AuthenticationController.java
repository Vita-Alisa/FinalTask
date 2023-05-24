package com.example.springsecurityapplication.controllers;

import com.example.springsecurityapplication.controllers.modelsRequest.AuthRequest;
import com.example.springsecurityapplication.controllers.modelsRequest.RegisterUserRequest;
import com.example.springsecurityapplication.controllers.modelsResponse.AuthedUser;
import com.example.springsecurityapplication.controllers.modelsResponse.AuthedUserError;
import com.example.springsecurityapplication.jwt.JwtTokenUtil;
import com.example.springsecurityapplication.models.Person;
import com.example.springsecurityapplication.repositories.PersonRepository;
import com.example.springsecurityapplication.security.PersonDetails;
import com.example.springsecurityapplication.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Controller
@CrossOrigin
public class AuthenticationController {
    private final PersonRepository personRepository;
    private final PersonService personService;

    @Autowired
    DaoAuthenticationProvider authenticationProvider;

    @Autowired
    JwtTokenUtil jwtUtil;

    public AuthenticationController(PersonRepository personRepository, PersonService personService) {
        this.personRepository = personRepository;
        this.personService = personService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Authentication authentication = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(), request.getPassword())
        );

        return getResponseEntity(authentication);
    }

    @PostMapping("/registration")
    public ResponseEntity<?> resultRegistration(@RequestBody RegisterUserRequest request) {
        Optional<Person> optionalPerson = personRepository.findByLogin(request.getLogin());
        var checkedPerson = optionalPerson.orElse(null);
        if (checkedPerson != null) {
            var user = new AuthedUserError();
            user.setMessage("Пользователь существует");
            return ResponseEntity.badRequest().body(user);
        }
        var person = new Person();
        person.setLogin(request.getLogin());
        person.setPassword(request.getPassword());
        var registeredPerson = personService.register(person);

        var authentication = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(), request.getPassword())
        );

        return getResponseEntity(authentication);
    }

    private ResponseEntity<?> getResponseEntity(Authentication authentication) {
        var user = (PersonDetails) authentication.getPrincipal();
        String accessToken = jwtUtil.generateAccessToken(user);

        var result = new AuthedUser();
        result.setId(user.getPerson().getId());
        result.setRole(user.getPerson().getRole());
        result.setLogin(user.getUsername());
        result.setAccessToken(accessToken);
        result.setMessage("Вы зарегистрировались!");
        return ResponseEntity.ok().body(result);
    }
}
