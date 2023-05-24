package com.example.springsecurityapplication.models;

import com.example.springsecurityapplication.enumm.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String number;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private Person person;

    private int count;
    private float price;
    private LocalDateTime dateTime;

    private Status status;

    @PrePersist
    private void init(){
        dateTime = LocalDateTime.now();
    }

    public Order(String number, Product product, Person person, int count, float price, Status status) {
        this.number = number;
        this.product = product;
        this.person = person;
        this.count = count;
        this.price = price;
        this.status = status;
}

    public Order() {
    }
}
