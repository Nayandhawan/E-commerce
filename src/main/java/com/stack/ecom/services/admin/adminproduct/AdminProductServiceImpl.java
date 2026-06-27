package com.stack.ecom.services.admin.adminproduct;

import com.stack.ecom.dto.ProductDto;
import com.stack.ecom.entity.Category;
import com.stack.ecom.entity.Product;
import com.stack.ecom.entity.ProductImage;
import com.stack.ecom.entity.StockSubscription;
import com.stack.ecom.repository.CategoryRepository;
import com.stack.ecom.repository.ProductImageRepository;
import com.stack.ecom.repository.ProductRepository;
import com.stack.ecom.repository.StockSubscriptionRepository;
import com.stack.ecom.services.notification.NotificationService;
import com.stack.ecom.services.storage.ImageStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminProductServiceImpl implements AdminProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ImageStorageService imageStorageService;
    private final ProductImageRepository productImageRepository;
    private final StockSubscriptionRepository stockSubscriptionRepository;
    private final NotificationService notificationService;

    public AdminProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository,
                                   ImageStorageService imageStorageService,
                                   ProductImageRepository productImageRepository,
                                   StockSubscriptionRepository stockSubscriptionRepository,
                                   NotificationService notificationService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.imageStorageService = imageStorageService;
        this.productImageRepository = productImageRepository;
        this.stockSubscriptionRepository = stockSubscriptionRepository;
        this.notificationService = notificationService;
    }

    public ProductDto addProduct(ProductDto productDto) throws IOException {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        String imgUrl = imageStorageService.save(productDto.getImg(), "products");
        product.setImgPath(imgUrl);
        product.setStockQuantity(productDto.getStockQuantity() != null ? productDto.getStockQuantity() : 100L);
        Category category = categoryRepository.findById(productDto.getCategoryId()).orElseThrow();
        product.setCategory(category);
        return productRepository.save(product).getDto();
    }

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream().map(Product::getDto).collect(Collectors.toList());
    }

    public List<ProductDto> getAllProductsByName(String name) {
        return productRepository.findAllByNameContaining(name).stream().map(Product::getDto).collect(Collectors.toList());
    }

    public boolean deleteProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public ProductDto getProductById(Long productId) {
        return productRepository.findById(productId).map(Product::getDto).orElse(null);
    }

    public ProductDto updateProduct(Long productId, ProductDto productDto) throws IOException {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Optional<Category> optionalCategory = categoryRepository.findById(productDto.getCategoryId());
        if (optionalProduct.isPresent() && optionalCategory.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDto.getName());
            product.setPrice(productDto.getPrice());
            product.setDescription(productDto.getDescription());
            product.setCategory(optionalCategory.get());

            if (productDto.getStockQuantity() != null) {
                long oldStock = product.getStockQuantity() != null ? product.getStockQuantity() : 0L;
                long newStock = productDto.getStockQuantity();
                product.setStockQuantity(newStock);
                if (oldStock == 0 && newStock > 0) {
                    notifyStockSubscribers(product);
                }
            }

            if (productDto.getImg() != null) {
                String imgUrl = imageStorageService.save(productDto.getImg(), "products");
                product.setImgPath(imgUrl);
                product.setImg(null);
            }
            return productRepository.save(product).getDto();
        }
        return null;
    }

    private void notifyStockSubscribers(Product product) {
        List<StockSubscription> subs = stockSubscriptionRepository.findByProductId(product.getId());
        for (StockSubscription sub : subs) {
            notificationService.create(sub.getUser().getId(),
                "\"" + product.getName() + "\" is back in stock! Grab it before it runs out.");
        }
    }

    public List<Map<String, Object>> addProductImage(Long productId, MultipartFile file) throws IOException {
        Product product = productRepository.findById(productId).orElseThrow();
        String imgUrl = imageStorageService.save(file, "products");
        ProductImage image = new ProductImage();
        image.setProduct(product);
        image.setImgPath(imgUrl);
        productImageRepository.save(image);
        return getProductImages(productId);
    }

    public List<Map<String, Object>> getProductImages(Long productId) {
        return productImageRepository.findByProductId(productId).stream()
            .map(img -> Map.<String, Object>of("id", img.getId(), "imgUrl", img.getImgPath()))
            .collect(Collectors.toList());
    }

    public boolean deleteProductImage(Long productId, Long imageId) {
        Optional<ProductImage> opt = productImageRepository.findById(imageId);
        if (opt.isEmpty() || !opt.get().getProduct().getId().equals(productId)) return false;
        productImageRepository.deleteById(imageId);
        return true;
    }
}
