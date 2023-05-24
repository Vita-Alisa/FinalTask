package com.example.springsecurityapplication.controllers;

import com.example.springsecurityapplication.controllers.modelsRequest.RegisterUserRequest;
import com.example.springsecurityapplication.controllers.modelsResponse.ImageInfoResponse;
import com.example.springsecurityapplication.controllers.modelsResponse.OrderInfoResponse;
import com.example.springsecurityapplication.controllers.modelsResponse.ProductInfoResponse;
import com.example.springsecurityapplication.controllers.modelsResponse.UserCartInfoResponse;
import com.example.springsecurityapplication.enumm.Status;
import com.example.springsecurityapplication.jwt.JwtTokenUtil;
import com.example.springsecurityapplication.models.*;
import com.example.springsecurityapplication.repositories.CartRepository;
import com.example.springsecurityapplication.repositories.OrderRepository;
import com.example.springsecurityapplication.repositories.ProductRepository;
import com.example.springsecurityapplication.security.PersonDetails;
import com.example.springsecurityapplication.services.OrderService;
import com.example.springsecurityapplication.services.PersonService;
import com.example.springsecurityapplication.services.ProductService;
import com.example.springsecurityapplication.util.PersonValidator;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
@CrossOrigin
@RolesAllowed("USER")
public class MainController {
    private final ProductService productService;
    private final OrderService orderService;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;

    public MainController(ProductService productService, OrderService orderService, CartRepository cartRepository, OrderRepository orderRepository) {
        this.productService = productService;
        this.orderService = orderService;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping("/orders")
    public ResponseEntity<?> orderUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        var personDetails = (PersonDetails) authentication.getPrincipal();
        var orderList = orderService.findByPerson(personDetails);
        return ResponseEntity.ok().body(orderList);
    }

    @GetMapping("/cart")
    public ResponseEntity<?> cart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PersonDetails personDetails = (PersonDetails) authentication.getPrincipal();
        // Извлекаем id пользователя из объекта
        int id_person = personDetails.getPerson().getId();

        List<Cart> cartList = cartRepository.findByPersonId(id_person);
        List<UserCartInfoResponse> productList = new ArrayList<>();

        // Получаем продукты из корзины по id товара
        for (Cart cart : cartList) {
            var product = productService.getProductId(cart.getProductId());

            var images = new ArrayList<ImageInfoResponse>();
            for (var image : product.getImageList()) {
                var imageResult = new ImageInfoResponse();
                imageResult.setId(image.getId());
                imageResult.setFileName(image.getFileName());
                images.add(imageResult);
            }

            var productResult = new ProductInfoResponse();
            productResult.setId(product.getId());
            productResult.setPrice(product.getPrice());
            productResult.setCategory(product.getCategory().getName());
            productResult.setSeller(product.getSeller());
            productResult.setTitle(product.getTitle());
            productResult.setDescription(product.getDescription());
            productResult.setDateTime(product.getDateTime());
            productResult.setWarehouse(product.getWarehouse());
            productResult.setImageList(images);

            var productInCart = new UserCartInfoResponse();
            productInCart.setId(cart.getId());
            productInCart.setPersonId(cart.getPersonId());
            productInCart.setProduct(productResult);

            productList.add(productInCart);
        }

        return ResponseEntity.ok().body(productList);
    }

    @GetMapping("/cart/add/{id}")
    public ResponseEntity<?> addProductInCart(@PathVariable("id") int id) {
        // Получаем продукт по id
        Product product = productService.getProductId(id);
        // Извлекаем объект аутентифицированного пользователя
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PersonDetails personDetails = (PersonDetails) authentication.getPrincipal();
        // Извлекаем id пользователя из объекта
        int id_person = personDetails.getPerson().getId();
        Cart cart = new Cart(id_person, product.getId());
        cartRepository.save(cart);

        return ResponseEntity.ok().body(cart);
    }

    @GetMapping("/cart/delete/{id}")
    public ResponseEntity<?> deleteProductFromCart(@PathVariable("id") int id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PersonDetails personDetails = (PersonDetails) authentication.getPrincipal();
        // Извлекаем id пользователя из объекта
        int id_person = personDetails.getPerson().getId();
        List<Cart> cartList = cartRepository.findByPersonId(id_person);
        List<Product> productList = new ArrayList<>();

        cartRepository.deleteAllByIdAndPersonId(id, id_person);

        // Получаем продукты из корзины по id товара
        for (Cart cart : cartList) {
            productList.add(productService.getProductId(cart.getProductId()));
        }

        return ResponseEntity.ok().body(productList);
    }

    @GetMapping("/order/create")
    public ResponseEntity<?> order() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PersonDetails personDetails = (PersonDetails) authentication.getPrincipal();
        // Извлекаем id пользователя из объекта

        int id_person = personDetails.getPerson().getId();

        List<Cart> cartList = cartRepository.findByPersonId(id_person);
        List<Product> productList = new ArrayList<>();

        // Получаем продукты из корзины по id товара
        for (Cart cart : cartList) {
            productList.add(productService.getProductId(cart.getProductId()));
        }

        String uuid = UUID.randomUUID().toString();
        var orderList = new ArrayList<OrderInfoResponse>();
        for (Product product : productList) {
            Order newOrder = new Order(uuid, product, personDetails.getPerson(), 1, product.getPrice(), Status.Оформлен);
            orderRepository.save(newOrder);
            cartRepository.deleteAllByProductId(product.getId());

            var images = new ArrayList<ImageInfoResponse>();
            for (var image : newOrder.getProduct().getImageList()) {
                var imageResult = new ImageInfoResponse();
                imageResult.setId(image.getId());
                imageResult.setFileName(image.getFileName());
                images.add(imageResult);
            }

            var orderProduct = new ProductInfoResponse();
            orderProduct.setId(newOrder.getProduct().getId());
            orderProduct.setPrice(newOrder.getProduct().getPrice());
            orderProduct.setCategory(newOrder.getProduct().getCategory().getName());
            orderProduct.setSeller(newOrder.getProduct().getSeller());
            orderProduct.setTitle(newOrder.getProduct().getTitle());
            orderProduct.setDescription(newOrder.getProduct().getDescription());
            orderProduct.setDateTime(newOrder.getProduct().getDateTime());
            orderProduct.setWarehouse(newOrder.getProduct().getWarehouse());
            orderProduct.setImageList(images);

            var orderResponse = new OrderInfoResponse();
            orderResponse.setId(newOrder.getId());
            orderResponse.setCount(newOrder.getCount());
            orderResponse.setPrice(newOrder.getPrice());
            orderResponse.setNumber(newOrder.getNumber());
            orderResponse.setDateTime(newOrder.getDateTime());
            orderResponse.setStatus(newOrder.getStatus());
            orderResponse.setLogin(newOrder.getPerson().getLogin());
            orderResponse.setProduct(orderProduct);

            orderList.add(orderResponse);
        }

        return ResponseEntity.ok().body(orderList);
    }
}
