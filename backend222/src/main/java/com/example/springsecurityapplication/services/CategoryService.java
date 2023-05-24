package com.example.springsecurityapplication.services;

import com.example.springsecurityapplication.controllers.modelsResponse.CategoryInfoResponse;
import com.example.springsecurityapplication.controllers.modelsResponse.OrderInfoResponse;
import com.example.springsecurityapplication.models.Category;
import com.example.springsecurityapplication.repositories.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public void saveCategory(Category category) {
        categoryRepository.save(category);
    }

    public List<CategoryInfoResponse> getAll() {
        var categories = categoryRepository.findAll();
        var result = new ArrayList<CategoryInfoResponse>();
        for (var category : categories) {
            result.add(new CategoryInfoResponse(category.getId(), category.getName()));
        }
        return result;
    }
}
