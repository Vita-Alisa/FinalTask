package com.example.springsecurityapplication.services;

import com.example.springsecurityapplication.controllers.modelsResponse.UserInfoResponse;
import com.example.springsecurityapplication.models.Person;
import com.example.springsecurityapplication.models.Product;
import com.example.springsecurityapplication.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PersonService {
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public PersonService(PersonRepository personRepository, PasswordEncoder passwordEncoder) {
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Person findByLogin(Person person) {
        Optional<Person> person_db = personRepository.findByLogin(person.getLogin());
        return person_db.orElse(null);
    }

    public List<UserInfoResponse> getAllUsers() {
        var users = personRepository.findAll();
        var result = new ArrayList<UserInfoResponse>();
        for (var user : users) {
            var userResponse = new UserInfoResponse();
            userResponse.setId(user.getId());
            userResponse.setLogin(user.getLogin());
            userResponse.setRole(user.getRole());
            result.add(userResponse);
        }
        return result;
    }

    @Transactional
    public Person register(Person person) {
        person.setPassword(passwordEncoder.encode(person.getPassword()));
        person.setRole("ROLE_USER");
        personRepository.save(person);
        return person;
    }

    @Transactional
    public UserInfoResponse updatePersonRole(int id, String role) {
        var person = personRepository.findById(id).get();
        person.setRole(role);
        personRepository.save(person);

        var result = new UserInfoResponse();
        result.setId(person.getId());
        result.setLogin(person.getLogin());
        result.setRole(role);
        return result;
    }

}
