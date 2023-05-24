package com.example.springsecurityapplication.controllers;

import com.example.springsecurityapplication.controllers.modelsRequest.SearchProductRequest;
import com.example.springsecurityapplication.controllers.modelsResponse.ImageInfoResponse;
import com.example.springsecurityapplication.controllers.modelsResponse.ProductInfoResponse;
import com.example.springsecurityapplication.models.Product;
import com.example.springsecurityapplication.repositories.ProductRepository;
import com.example.springsecurityapplication.services.CategoryService;
import com.example.springsecurityapplication.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductService productService;
    private final CategoryService categoryService;

    public ProductController(ProductRepository productRepository, ProductService productService, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping("/product")
    public ResponseEntity<?> getAllProduct() {
        var productList = productService.getAllProduct();
        return ResponseEntity.ok().body(productList);
    }

    @GetMapping("/product/info/{id}")
    public ResponseEntity<?> infoProduct(@PathVariable("id") int id) {
        var result = productService.getProductResponseId(id);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/admin/category")
    public ResponseEntity<?> categories() {
        var categoryList = categoryService.getAll();
        return ResponseEntity.ok().body(categoryList);
    }

    @PostMapping("/product/search")
    public ResponseEntity<?> productSearch(@RequestBody SearchProductRequest request) {
        List<Product> products = new ArrayList<>();

        if (request.getOtPrice().isEmpty()) {
            request.setOtPrice("0");
        }
        if (request.getDoPrice().isEmpty()) {
            request.setDoPrice("99999999999");
        }

        if (!request.getOtPrice().isEmpty() & !request.getDoPrice().isEmpty()) {
            if (!request.getPrice().isEmpty()) {
                if (request.getPrice().equals("sorted_by_ascending_price")) {
                    if (!(request.getContract() == 0)) {
                        products = productRepository.findByTitleAndCategoryOrderByPriceAsc(request.getSearch().toLowerCase(), Float.parseFloat(request.getOtPrice()), Float.parseFloat(request.getDoPrice()), request.getContract());

                    } else {
                        products = productRepository.findByTitleOrderByPriceAsc(request.getSearch().toLowerCase(), Float.parseFloat(request.getOtPrice()), Float.parseFloat(request.getDoPrice()));
                    }
                } else if (request.getPrice().equals("sorted_by_descending_price")) {
                    if (!(request.getContract() == 0)) {
                        System.out.println(request.getContract());
                        products = productRepository.findByTitleAndCategoryOrderByPriceDesc(request.getSearch().toLowerCase(), Float.parseFloat(request.getOtPrice()), Float.parseFloat(request.getDoPrice()), request.getContract());

                    } else {
                        products = productRepository.findByTitleOrderByPriceDesc(request.getSearch().toLowerCase(), Float.parseFloat(request.getOtPrice()), Float.parseFloat(request.getDoPrice()));
                    }
                } else {
                    if (!(request.getContract() == 0)) {
                        products = productRepository.findByTitleAndCategoryOrderByPriceAsc(request.getSearch().toLowerCase(), Float.parseFloat(request.getOtPrice()), Float.parseFloat(request.getDoPrice()), request.getContract());

                    } else {
                        products = productRepository.findByTitleOrderByPriceAsc(request.getSearch().toLowerCase(), Float.parseFloat(request.getOtPrice()), Float.parseFloat(request.getDoPrice()));
                    }
                }
            } else {
                if (!(request.getContract() == 0)) {
                    products = productRepository.findByTitleAndCategoryOrderByPriceAsc(request.getSearch().toLowerCase(), Float.parseFloat(request.getOtPrice()), Float.parseFloat(request.getDoPrice()), request.getContract());

                } else {
                    products = productRepository.findByTitleAndPriceGreaterThanEqualAndPriceLessThanEqual(request.getSearch().toLowerCase(), Float.parseFloat(request.getOtPrice()), Float.parseFloat(request.getDoPrice()));
                }
            }
        } else {
            products = productRepository.findByTitleContainingIgnoreCase(request.getSearch());
        }

        var productList = new ArrayList<ProductInfoResponse>();

        for (var product : products) {
            var images = new ArrayList<ImageInfoResponse>();
            for (var image : product.getImageList()) {
                var imageResult = new ImageInfoResponse();
                imageResult.setId(image.getId());
                imageResult.setFileName(image.getFileName());
                images.add(imageResult);
            }
            var productResponse = new ProductInfoResponse();
            productResponse.setId(product.getId());
            productResponse.setPrice(product.getPrice());
            productResponse.setTitle(product.getTitle());
            productResponse.setDescription(product.getDescription());
            productResponse.setWarehouse(product.getWarehouse());
            productResponse.setSeller(product.getSeller());
            productResponse.setCategory(product.getCategory().getName());
            productResponse.setDateTime(product.getDateTime());
            productResponse.setImageList(images);

            productList.add(productResponse);
        }

        return ResponseEntity.ok().body(productList);
    }
}
