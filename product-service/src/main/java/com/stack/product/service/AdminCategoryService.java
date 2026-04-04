package com.stack.product.service;

import com.stack.product.dto.CategoryDto;
import java.util.List;

public interface AdminCategoryService {
    CategoryDto createCategory(CategoryDto dto);
    List<CategoryDto> getAllCategories();
}
