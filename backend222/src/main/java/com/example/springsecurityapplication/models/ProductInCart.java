package com.example.springsecurityapplication.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductInCart {
    private int productInCardId;
    private int id;
    private String title;
    private String description;
    private float price;
    private String warehouse;
    private String seller;
    private Category category;
    private LocalDateTime dateTime;
    private List<Image> imageList = new ArrayList<>();

    public ProductInCart(Product product, int productInCardId) {
        this.productInCardId = productInCardId;
        this.id = product.getId();
        this.title = product.getTitle();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.warehouse = product.getWarehouse();
        this.seller = product.getSeller();
        this.category = product.getCategory();
        this.dateTime = product.getDateTime();
        this.imageList = product.getImageList();
    }

    public ProductInCart() {
    }
}
