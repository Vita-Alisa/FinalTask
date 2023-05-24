package com.example.springsecurityapplication.controllers;

import com.example.springsecurityapplication.controllers.modelsRequest.*;
import com.example.springsecurityapplication.controllers.modelsResponse.ImageInfoResponse;
import com.example.springsecurityapplication.controllers.modelsResponse.ProductInfoResponse;
import com.example.springsecurityapplication.enumm.Status;
import com.example.springsecurityapplication.models.*;
import com.example.springsecurityapplication.repositories.*;
import com.example.springsecurityapplication.services.CategoryService;
import com.example.springsecurityapplication.services.OrderService;
import com.example.springsecurityapplication.services.PersonService;
import com.example.springsecurityapplication.services.ProductService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
@CrossOrigin
@RolesAllowed("ADMIN")
public class AdminController {

    private final ProductService productService;
    private final OrderService orderService;
    private final PersonService personService;
    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;
    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;

    @Value("${upload.path}")
   // @Value("C:\\Users\\Romtila\\Documents\\Repos\\react-shop\\public\\images")
    private String uploadPath;

    public AdminController(ProductService productService, OrderService orderService, PersonService personService, CategoryService categoryService, CategoryRepository categoryRepository, ImageRepository imageRepository, ProductRepository productRepository) {
        this.productService = productService;
        this.orderService = orderService;
        this.personService = personService;
        this.categoryService = categoryService;
        this.categoryRepository = categoryRepository;
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }

    @GetMapping("/admin/users")
    public ResponseEntity<?> adminUsers() {
        var users = personService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }

    @PostMapping("/admin/users/edit/{id}")
    public ResponseEntity<?> editUserRole(@PathVariable("id") int id, @RequestBody UpdateUserRoleRequest role) {
        var result = personService.updatePersonRole(id, role.getRole());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/admin/orders")
    public ResponseEntity<?> adminOrders() {
        var orderList = orderService.getAllOrders();
        return ResponseEntity.ok().body(orderList);
    }

    @PostMapping("/admin/orders/edit/{id}")
    public ResponseEntity<?> editOrderStatus(@PathVariable("id") int id, @RequestBody UpdateOrderStatusRequest status) {
        var statusEnum = switch (status.getStatus()) {
            case "Принят" -> Status.Принят;
            case "Оформлен" -> Status.Оформлен;
            case "Получен" -> Status.Получен;
            default -> Status.Ожидает;
        };
        var result = orderService.updateOrderState(id, statusEnum);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/admin/orders/search")
    public ResponseEntity<?> orderSearch(@RequestBody SearchProductRequest search) {
        var orderList = orderService.findByNumberContainingIgnoreCase(search.getSearch());
        return ResponseEntity.ok().body(orderList);
    }



    @GetMapping("/admin")
    public ResponseEntity<?> admin() {
        var productList = productService.getAllProduct();
        return ResponseEntity.ok().body(productList);
    }

    @PostMapping("/admin/product/addImages/{id}")
    public ResponseEntity<?> addProductImages(@PathVariable("id") int id, @ModelAttribute AddProductImagesRequest request) throws IOException {
        var product = productRepository.findById(id).orElseThrow();

        if (request.getFile_one() != null ||
                request.getFile_two() != null ||
                request.getFile_three() != null ||
                request.getFile_four() != null ||
                request.getFile_five() != null) {
            imageRepository.deleteByProduct_Id(id);
        }

        if (request.getFile_one() != null) {
            var uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            var uuidFile = UUID.randomUUID().toString();
            var resultFileName = uuidFile + "." + request.getFile_one().getOriginalFilename();
            request.getFile_one().transferTo(new File(uploadPath + "/" + resultFileName));

            Image image = new Image();
            image.setProduct(product);
            image.setFileName(resultFileName);

            imageRepository.save(image);
        }

        if (request.getFile_two() != null) {
            var uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            var uuidFile = UUID.randomUUID().toString();
            var resultFileName = uuidFile + "." + request.getFile_two().getOriginalFilename();
            request.getFile_two().transferTo(new File(uploadPath + "/" + resultFileName));

            Image image = new Image();
            image.setProduct(product);
            image.setFileName(resultFileName);

            imageRepository.save(image);
        }

        if (request.getFile_three() != null) {
            var uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            var uuidFile = UUID.randomUUID().toString();
            var resultFileName = uuidFile + "." + request.getFile_three().getOriginalFilename();
            request.getFile_three().transferTo(new File(uploadPath + "/" + resultFileName));

            Image image = new Image();
            image.setProduct(product);
            image.setFileName(resultFileName);

            imageRepository.save(image);
        }

        if (request.getFile_four() != null) {
            var uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            var uuidFile = UUID.randomUUID().toString();
            var resultFileName = uuidFile + "." + request.getFile_four().getOriginalFilename();
            request.getFile_four().transferTo(new File(uploadPath + "/" + resultFileName));

            Image image = new Image();
            image.setProduct(product);
            image.setFileName(resultFileName);

            imageRepository.save(image);
        }

        if (request.getFile_five() != null) {
            var uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            var uuidFile = UUID.randomUUID().toString();
            var resultFileName = uuidFile + "." + request.getFile_five().getOriginalFilename();
            request.getFile_five().transferTo(new File(uploadPath + "/" + resultFileName));

            Image image = new Image();
            image.setProduct(product);
            image.setFileName(resultFileName);

            imageRepository.save(image);
        }

        var images = new ArrayList<ImageInfoResponse>();
        for (var image : product.getImageList()) {
            var imageResult = new ImageInfoResponse();
            imageResult.setId(image.getId());
            imageResult.setFileName(image.getFileName());
            images.add(imageResult);
        }
        var productInfoResponse = new ProductInfoResponse();
        productInfoResponse.setId(product.getId());
        productInfoResponse.setDescription(product.getDescription());
        productInfoResponse.setWarehouse(product.getWarehouse());
        productInfoResponse.setCategory(product.getCategory().getName());
        productInfoResponse.setSeller(product.getSeller());
        productInfoResponse.setPrice(product.getPrice());
        productInfoResponse.setTitle(product.getTitle());
        productInfoResponse.setImageList(images);
        productInfoResponse.setDateTime(product.getDateTime());

        return ResponseEntity.ok().body(productInfoResponse);
    }

    @PostMapping("/admin/product/add")
    public ResponseEntity<?> addProduct(@RequestBody AddProductRequest request) {
        var product = new Product();
        var category_db = new Category();

        if (request.getCategoryId() == 0) {
            category_db = categoryRepository.findById(1).orElseThrow();
        } else {
            category_db = categoryRepository.findById(request.getCategoryId()).orElseThrow();
        }

        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setWarehouse(request.getWarehouse());
        product.setSeller(request.getSeller());
        product.setDateTime(LocalDateTime.now());
        product.setImageList(new ArrayList<>());
        product.setCategory(category_db);

        var createdProduct = productService.saveProduct(product);

        return ResponseEntity.ok().body(createdProduct);
    }

    @GetMapping("/admin/product/info/{id}")
    public ResponseEntity<?> infoProduct(@PathVariable("id") int id) {
        var result = productService.getProductResponseId(id);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/admin/product/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") int id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().body(id);
    }

    @PostMapping("/admin/product/edit/{id}")
    public ResponseEntity<?> editProduct(@PathVariable("id") int id, @RequestBody EditProductRequest request) {

        var noUpdatedProduct = productService.getProductId(id);

        var categoryId = request.getCategoryId();
        if (categoryId == 0) {
            categoryId = noUpdatedProduct.getCategory().getId();
        }

        var category = categoryRepository.getById(categoryId);

        var images = new ArrayList<ImageInfoResponse>();
        for (var image : noUpdatedProduct.getImageList()) {
            var imageResult = new ImageInfoResponse();
            imageResult.setId(image.getId());
            imageResult.setFileName(image.getFileName());
            images.add(imageResult);
        }
        noUpdatedProduct.setTitle(request.getTitle());
        noUpdatedProduct.setDescription(request.getDescription());
        noUpdatedProduct.setPrice(request.getPrice());
        noUpdatedProduct.setWarehouse(request.getWarehouse());
        noUpdatedProduct.setSeller(request.getSeller());
        noUpdatedProduct.setCategory(category);

        productService.updateProduct(id, noUpdatedProduct);

        var editedProduct = new ProductInfoResponse();

        editedProduct.setId(noUpdatedProduct.getId());
        editedProduct.setTitle(noUpdatedProduct.getTitle());
        editedProduct.setDescription(noUpdatedProduct.getDescription());
        editedProduct.setPrice(noUpdatedProduct.getPrice());
        editedProduct.setWarehouse(noUpdatedProduct.getWarehouse());
        editedProduct.setSeller(noUpdatedProduct.getSeller());
        editedProduct.setDateTime(noUpdatedProduct.getDateTime());
        editedProduct.setCategory(noUpdatedProduct.getCategory().getName());
        editedProduct.setImageList(images);

        return ResponseEntity.ok().body(editedProduct);
    }

    @PostMapping("/admin/product/search")
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
