package com.stack.ecom.services.admin.category;

import com.stack.ecom.dto.CategoryDto;
import com.stack.ecom.entity.Category;

import java.util.List;

public interface CategoryService {

    Category createCategory(CategoryDto categoryDto);

    List<Category> getAllCategories();

    Category updateCategory(Long id, CategoryDto categoryDto);

    void deleteCategory(Long id);
}
