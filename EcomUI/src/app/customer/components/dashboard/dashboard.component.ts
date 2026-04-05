import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';

const CAT_ICONS: Record<string, string> = {
  fashion:     'checkroom',
  clothing:    'checkroom',
  mobiles:     'smartphone',
  mobile:      'smartphone',
  phone:       'smartphone',
  electronics: 'devices',
  beauty:      'spa',
  home:        'home',
  appliances:  'kitchen',
  toys:        'toys',
  food:        'restaurant',
  grocery:     'local_grocery_store',
  sports:      'sports_soccer',
  fitness:     'fitness_center',
  books:       'menu_book',
  furniture:   'chair',
  auto:        'directions_car',
  automotive:  'directions_car',
  jewellery:   'diamond',
  jewelry:     'diamond',
  shoes:       'directions_walk',
  footwear:    'directions_walk',
  bags:        'shopping_bag',
  watches:     'watch',
  kids:        'child_care',
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  allProducts: any[] = [];
  products: any[] = [];
  categories: string[] = [];
  selectedCategory = 'All';
  searchProductForm!: FormGroup;
  wishlistedIds = new Set<number>();

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.searchProductForm = this.fb.group({ title: [null, Validators.required] });
    this.getAllProducts();
    this.loadWishlist();
  }

  loadWishlist() {
    this.customerService.getWishlistByUserId().subscribe({
      next: (res: any[]) => {
        this.wishlistedIds = new Set(res.map((item: any) => item.productId ?? item.product?.id ?? item.id));
      },
      error: () => {}
    });
  }

  isWishlisted(productId: number): boolean {
    return this.wishlistedIds.has(productId);
  }

  toggleWishlist(productId: number, event: Event) {
    event.stopPropagation();
    if (this.wishlistedIds.has(productId)) {
      this.customerService.removeFromWishlist(productId).subscribe({
        next: () => {
          this.wishlistedIds.delete(productId);
          this.snackBar.open('Removed from wishlist', 'Close', { duration: 2000 });
        },
        error: () => this.snackBar.open('Could not remove from wishlist', 'Close', { duration: 2000 })
      });
    } else {
      const dto = { userId: UserStorageService.getUserId(), productId };
      this.customerService.addProductToWishlist(dto).subscribe({
        next: () => {
          this.wishlistedIds.add(productId);
          this.snackBar.open('Added to wishlist!', 'Close', { duration: 2000 });
        },
        error: () => this.snackBar.open('Could not add to wishlist', 'Close', { duration: 2000 })
      });
    }
  }

  getAllProducts() {
    this.customerService.getAllProducts().subscribe(res => {
      this.allProducts = res.map((p: any) => ({
        ...p,
        processedImg: p.byteImg ? 'data:image/jpeg;base64,' + p.byteImg : null
      }));
      this.categories = [...new Set<string>(this.allProducts.map(p => p.categoryName))];
      this.applyFilter();
    });
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilter();
  }

  private applyFilter() {
    this.products = this.selectedCategory === 'All'
      ? this.allProducts
      : this.allProducts.filter(p => p.categoryName === this.selectedCategory);
  }

  submitForm() {
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllProductsByName(title).subscribe(res => {
      this.allProducts = res.map((p: any) => ({
        ...p,
        processedImg: p.byteImg ? 'data:image/jpeg;base64,' + p.byteImg : null
      }));
      this.selectedCategory = 'All';
      this.categories = [...new Set<string>(this.allProducts.map(p => p.categoryName))];
      this.applyFilter();
    });
  }

  addToCart(id: any) {
    this.customerService.addToCart(id).subscribe(() => {
      this.snackBar.open('Product added to cart!', 'Close', { duration: 3000 });
    });
  }

  getCatIcon(cat: string): string {
    const key = cat.toLowerCase().split(' ')[0];
    return CAT_ICONS[key] ?? 'category';
  }
}
