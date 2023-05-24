package com.example.springsecurityapplication.services;

import com.example.springsecurityapplication.controllers.modelsResponse.*;
import com.example.springsecurityapplication.enumm.Status;
import com.example.springsecurityapplication.repositories.OrderRepository;
import com.example.springsecurityapplication.security.PersonDetails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<OrderInfoResponse> findByNumberContainingIgnoreCase(String search){
        var orders = orderRepository.findByNumberContainingIgnoreCase(search);
        var result = new ArrayList<OrderInfoResponse>();
        for (var order : orders) {

            var images = new ArrayList<ImageInfoResponse>();
            for (var image : order.getProduct().getImageList()) {
                var imageResult = new ImageInfoResponse();
                imageResult.setId(image.getId());
                imageResult.setFileName(image.getFileName());
                images.add(imageResult);
            }

            var product = new ProductInfoResponse();
            product.setId(order.getProduct().getId());
            product.setPrice(order.getProduct().getPrice());
            product.setCategory(order.getProduct().getCategory().getName());
            product.setSeller(order.getProduct().getSeller());
            product.setTitle(order.getProduct().getTitle());
            product.setDescription(order.getProduct().getDescription());
            product.setDateTime(order.getProduct().getDateTime());
            product.setWarehouse(order.getProduct().getWarehouse());
            product.setImageList(images);

            var orderResponse = new OrderInfoResponse();
            orderResponse.setId(order.getId());
            orderResponse.setCount(order.getCount());
            orderResponse.setPrice(order.getPrice());
            orderResponse.setNumber(order.getNumber());
            orderResponse.setDateTime(order.getDateTime());
            orderResponse.setStatus(order.getStatus());
            orderResponse.setLogin(order.getPerson().getLogin());
            orderResponse.setProduct(product);
            result.add(orderResponse);
        }
        return result;
    }

    public List<OrderInfoResponse> getAllOrders() {
        var orders = orderRepository.findAll();
        var result = new ArrayList<OrderInfoResponse>();
        for (var order : orders) {

            var images = new ArrayList<ImageInfoResponse>();
            for (var image : order.getProduct().getImageList()) {
                var imageResult = new ImageInfoResponse();
                imageResult.setId(image.getId());
                imageResult.setFileName(image.getFileName());
                images.add(imageResult);
            }

            var product = new ProductInfoResponse();
            product.setId(order.getProduct().getId());
            product.setPrice(order.getProduct().getPrice());
            product.setCategory(order.getProduct().getCategory().getName());
            product.setSeller(order.getProduct().getSeller());
            product.setTitle(order.getProduct().getTitle());
            product.setDescription(order.getProduct().getDescription());
            product.setDateTime(order.getProduct().getDateTime());
            product.setWarehouse(order.getProduct().getWarehouse());
            product.setImageList(images);

            var orderResponse = new OrderInfoResponse();
            orderResponse.setId(order.getId());
            orderResponse.setCount(order.getCount());
            orderResponse.setPrice(order.getPrice());
            orderResponse.setNumber(order.getNumber());
            orderResponse.setDateTime(order.getDateTime());
            orderResponse.setStatus(order.getStatus());
            orderResponse.setLogin(order.getPerson().getLogin());
            orderResponse.setProduct(product);
            result.add(orderResponse);
        }
        return result;
    }

    @Transactional
    public OrderInfoResponse updateOrderState(int id, Status status) {
        var order = orderRepository.findById(id).get();
        order.setStatus(status);
        orderRepository.save(order);

        var images = new ArrayList<ImageInfoResponse>();
        for (var image : order.getProduct().getImageList()) {
            var imageResult = new ImageInfoResponse();
            imageResult.setId(image.getId());
            imageResult.setFileName(image.getFileName());
            images.add(imageResult);
        }

        var product = new ProductInfoResponse();
        product.setId(order.getProduct().getId());
        product.setPrice(order.getProduct().getPrice());
        product.setCategory(order.getProduct().getCategory().getName());
        product.setSeller(order.getProduct().getSeller());
        product.setTitle(order.getProduct().getTitle());
        product.setDescription(order.getProduct().getDescription());
        product.setDateTime(order.getProduct().getDateTime());
        product.setWarehouse(order.getProduct().getWarehouse());
        product.setImageList(images);

        var result = new OrderInfoResponse();
        result.setId(order.getId());
        result.setCount(order.getCount());
        result.setPrice(order.getPrice());
        result.setNumber(order.getNumber());
        result.setDateTime(order.getDateTime());
        result.setStatus(order.getStatus());
        result.setLogin(order.getPerson().getLogin());
        result.setProduct(product);
        return result;
    }

    public List<OrderInfoResponse> findByPerson(PersonDetails personDetails) {
        var orders = orderRepository.findByPerson(personDetails.getPerson());
        var result = new ArrayList<OrderInfoResponse>();
        for (var order : orders) {

            var images = new ArrayList<ImageInfoResponse>();
            for (var image : order.getProduct().getImageList()) {
                var imageResult = new ImageInfoResponse();
                imageResult.setId(image.getId());
                imageResult.setFileName(image.getFileName());
                images.add(imageResult);
            }

            var product = new ProductInfoResponse();
            product.setId(order.getProduct().getId());
            product.setPrice(order.getProduct().getPrice());
            product.setCategory(order.getProduct().getCategory().getName());
            product.setSeller(order.getProduct().getSeller());
            product.setTitle(order.getProduct().getTitle());
            product.setDescription(order.getProduct().getDescription());
            product.setDateTime(order.getProduct().getDateTime());
            product.setWarehouse(order.getProduct().getWarehouse());
            product.setImageList(images);

            var orderResponse = new OrderInfoResponse();
            orderResponse.setId(order.getId());
            orderResponse.setCount(order.getCount());
            orderResponse.setPrice(order.getPrice());
            orderResponse.setNumber(order.getNumber());
            orderResponse.setDateTime(order.getDateTime());
            orderResponse.setStatus(order.getStatus());
            orderResponse.setLogin(order.getPerson().getLogin());
            orderResponse.setProduct(product);
            result.add(orderResponse);
        }
        return result;
    }
}
