package com.example.springsecurityapplication.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product_cart")
@Getter
@Setter
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "person_id")
    private int personId;

    @Column(name = "product_id")
    private int productId;

    public Cart(int personId, int productId) {
        this.personId = personId;
        this.productId = productId;
    }

    public Cart() {
    }
}
