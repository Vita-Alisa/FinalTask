package com.example.springsecurityapplication.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String fileName;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private Product product;

    public Image(int id, String fileName, Product product) {
        this.id = id;
        this.fileName = fileName;
        this.product = product;
    }

    public Image() {
    }
}
