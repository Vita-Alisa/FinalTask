package com.example.springsecurityapplication.services;

import com.example.springsecurityapplication.controllers.modelsResponse.ImageInfoResponse;
import com.example.springsecurityapplication.controllers.modelsResponse.OrderInfoResponse;
import com.example.springsecurityapplication.controllers.modelsResponse.ProductInfoResponse;
import com.example.springsecurityapplication.models.Category;
import com.example.springsecurityapplication.models.Product;
import com.example.springsecurityapplication.repositories.CartRepository;
import com.example.springsecurityapplication.repositories.ImageRepository;
import com.example.springsecurityapplication.repositories.OrderRepository;
import com.example.springsecurityapplication.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final ImageRepository imageRepository;
    private final CartRepository cartRepository;

    public ProductService(ProductRepository productRepository, OrderRepository orderRepository, ImageRepository imageRepository, CartRepository cartRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.imageRepository = imageRepository;
        this.cartRepository = cartRepository;
    }

    // Данный метод позволяет получить список всех товаров
    public List<ProductInfoResponse> getAllProduct() {
        var products = productRepository.findAll();
        var result = new ArrayList<ProductInfoResponse>();
        for (var product : products) {

            var images = new ArrayList<ImageInfoResponse>();
            for (var image : product.getImageList()) {
                var imageResult = new ImageInfoResponse();
                imageResult.setId(image.getId());
                imageResult.setFileName(image.getFileName());
                images.add(imageResult);
            }

            var productInfoResponse = new ProductInfoResponse();
            productInfoResponse.setId(product.getId());
            productInfoResponse.setPrice(product.getPrice());
            productInfoResponse.setCategory(product.getCategory().getName());
            productInfoResponse.setSeller(product.getSeller());
            productInfoResponse.setTitle(product.getTitle());
            productInfoResponse.setDescription(product.getDescription());
            productInfoResponse.setDateTime(product.getDateTime());
            productInfoResponse.setWarehouse(product.getWarehouse());
            productInfoResponse.setImageList(images);

            result.add(productInfoResponse);
        }
        return result;
    }

    // Данный метод позволяет получить товар по id
    public Product getProductId(int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        return optionalProduct.orElse(null);
    }

    public ProductInfoResponse getProductResponseId(int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        var product = optionalProduct.orElse(null);
        if (product == null) {
            return null;
        } else {
            var images = new ArrayList<ImageInfoResponse>();
            for (var image : product.getImageList()) {
                var imageResult = new ImageInfoResponse();
                imageResult.setId(image.getId());
                imageResult.setFileName(image.getFileName());
                images.add(imageResult);
            }

            var result = new ProductInfoResponse();
            result.setId(product.getId());
            result.setPrice(product.getPrice());
            result.setTitle(product.getTitle());
            result.setDescription(product.getDescription());
            result.setCategory(product.getCategory().getName());
            result.setSeller(product.getSeller());
            result.setWarehouse(product.getWarehouse());
            result.setImageList(images);
            result.setDateTime(product.getDateTime());

            return result;
        }
    }

    // Данный метод позволяет сохранить товар
    @Transactional
    public ProductInfoResponse saveProduct(Product product) {
        var addedProduct = productRepository.save(product);

        var images = new ArrayList<ImageInfoResponse>();
        for (var image : addedProduct.getImageList()) {
            var imageResult = new ImageInfoResponse();
            imageResult.setId(image.getId());
            imageResult.setFileName(image.getFileName());
            images.add(imageResult);
        }
        var productInfoResponse = new ProductInfoResponse();
        productInfoResponse.setId(addedProduct.getId());
        productInfoResponse.setDescription(addedProduct.getDescription());
        productInfoResponse.setWarehouse(addedProduct.getWarehouse());
        productInfoResponse.setCategory(addedProduct.getCategory().getName());
        productInfoResponse.setSeller(addedProduct.getSeller());
        productInfoResponse.setPrice(addedProduct.getPrice());
        productInfoResponse.setTitle(addedProduct.getTitle());
        productInfoResponse.setImageList(images);
        productInfoResponse.setDateTime(addedProduct.getDateTime());

        return productInfoResponse;
    }

    // Данный метод позволяет обновить данные о товаре
    @Transactional
    public void updateProduct(int id, Product product) {
        product.setId(id);
        productRepository.save(product);
    }

    // Данный метод позволяет удалить товар по id
    @Transactional
    public void deleteProduct(int id) {
        cartRepository.deleteAllByProductId(id);
        orderRepository.deleteAllByProduct_Id(id);
        imageRepository.deleteByProduct_Id(id);
        productRepository.deleteById(id);
    }
}
