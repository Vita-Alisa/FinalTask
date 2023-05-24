package com.example.springsecurityapplication.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Category {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false, columnDefinition = "text")
    @NotEmpty(message = "Наименование категории не может быть пустым")
    private String name;

    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
    private List<Product> product;

    public Category(String name) {
        this.name = name;
    }

    public Category() {
    }
}
