import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { loadWishlist, addToWishlist, removeFromWishlist } from '../../../store/wishlist/wishlist.actions';
import { selectWishlistIds } from '../../../store/wishlist/wishlist.selectors';

const CAT_ICONS: Record<string, string> = {
  fashion:     'shirt',
  clothing:    'shirt',
  mobiles:     'smartphone',
  mobile:      'smartphone',
  phone:       'smartphone',
  electronics: 'cpu',
  beauty:      'sparkles',
  home:        'house',
  appliances:  'zap',
  toys:        'gamepad-2',
  food:        'shopping-basket',
  grocery:     'shopping-basket',
  sports:      'dumbbell',
  fitness:     'dumbbell',
  books:       'book-open',
  furniture:   'briefcase',
  auto:        'car',
  automotive:  'car',
  jewellery:   'gem',
  jewelry:     'gem',
  shoes:       'footprints',
  footwear:    'footprints',
  bags:        'briefcase',
  watches:     'watch',
  kids:        'baby',
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
  wishlistedIds$: Observable<number[]>;
  private _wishlistedIds: number[] = [];

  suggestions: string[] = [];
  showSuggestions = false;
  recentlyViewed: any[] = [];

  sortBy = 'default';
  maxPrice: number = 0;
  maxPriceLimit: number = 0;
  readonly starRange = [1, 2, 3, 4, 5];

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private store: Store
  ) {
    this.wishlistedIds$ = this.store.select(selectWishlistIds);
  }

  ngOnInit() {
    this.searchProductForm = this.fb.group({ title: [null, Validators.required] });
    this.getAllProducts();
    this.store.dispatch(loadWishlist());
    this.wishlistedIds$.subscribe(ids => { this._wishlistedIds = ids; });
    this.loadRecentlyViewed();

    this.searchProductForm.get('title')!.valueChanges.subscribe(val => {
      if (val && val.length >= 2) {
        const q = val.toLowerCase();
        this.suggestions = this.allProducts
          .map(p => p.name as string)
          .filter(n => n.toLowerCase().includes(q))
          .slice(0, 6);
        this.showSuggestions = this.suggestions.length > 0;
      } else {
        this.showSuggestions = false;
      }
    });
  }

  pickSuggestion(name: string) {
    this.searchProductForm.patchValue({ title: name });
    this.showSuggestions = false;
    this.submitForm();
  }

  hideSuggestions() { setTimeout(() => { this.showSuggestions = false; }, 150); }

  private loadRecentlyViewed() {
    try {
      const raw = localStorage.getItem('sk_recently_viewed');
      this.recentlyViewed = raw ? JSON.parse(raw) : [];
    } catch { this.recentlyViewed = []; }
  }

  isWishlisted(productId: number): boolean {
    return this._wishlistedIds.includes(productId);
  }

  toggleWishlist(productId: number, event: Event) {
    event.stopPropagation();
    if (this.isWishlisted(productId)) {
      this.store.dispatch(removeFromWishlist({ productId }));
    } else {
      this.store.dispatch(addToWishlist({ productId }));
    }
  }

  getAllProducts() {
    this.customerService.getAllProducts().subscribe(res => {
      this.allProducts = res.map((p: any) => ({
        ...p,
        processedImg: p.byteImg ? 'data:image/jpeg;base64,' + p.byteImg : null
      }));
      this.categories = [...new Set<string>(this.allProducts.map(p => p.categoryName))];
      this.maxPriceLimit = Math.max(...this.allProducts.map(p => p.price ?? 0), 0);
      this.maxPrice = this.maxPriceLimit;
      this.applyFilter();
    });
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilter();
  }

  setSortBy(sort: string) {
    this.sortBy = sort;
    this.applyFilter();
  }

  resetFilters() {
    this.sortBy = 'default';
    this.maxPrice = this.maxPriceLimit;
    this.selectedCategory = 'All';
    this.applyFilter();
  }

  applyFilter() {
    let filtered = this.selectedCategory === 'All'
      ? [...this.allProducts]
      : this.allProducts.filter(p => p.categoryName === this.selectedCategory);

    filtered = filtered.filter(p => (p.price ?? 0) <= this.maxPrice);

    switch (this.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price_desc':
        filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));
        break;
    }

    this.products = filtered;
  }

  submitForm() {
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllProductsByName(title).subscribe(res => {
      this.allProducts = res.map((p: any) => ({
        ...p,
        processedImg: p.byteImg ? 'data:image/jpeg;base64,' + p.byteImg : null
      }));
      this.selectedCategory = 'All';
      this.sortBy = 'default';
      this.categories = [...new Set<string>(this.allProducts.map(p => p.categoryName))];
      this.maxPriceLimit = Math.max(...this.allProducts.map(p => p.price ?? 0), 0);
      this.maxPrice = this.maxPriceLimit;
      this.applyFilter();
    });
  }

  clearSearch() {
    this.searchProductForm.reset();
    this.getAllProducts();
  }

  addToCart(id: any, inStock: boolean, event: Event) {
    event.stopPropagation();
    if (!inStock) return;
    this.customerService.addToCart(id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart!', life: 3000 });
    });
  }

  getCatIcon(cat: string): string {
    const key = cat.toLowerCase().split(' ')[0];
    return CAT_ICONS[key] ?? 'square-stack';
  }

  getStarFill(star: number, rating: number | null): string {
    if (!rating) return 'none';
    return star <= Math.round(rating) ? 'currentColor' : 'none';
  }
}
