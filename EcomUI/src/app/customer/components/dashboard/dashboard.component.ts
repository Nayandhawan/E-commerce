import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { CompareService } from '../../../services/compare/compare.service';
import { loadWishlist, addToWishlist, removeFromWishlist } from '../../../store/wishlist/wishlist.actions';
import { selectWishlistIds } from '../../../store/wishlist/wishlist.selectors';
import { loadCart, increaseQuantity, decreaseQuantity, removeFromCart } from '../../../store/cart/cart.actions';
import { selectCartItems } from '../../../store/cart/cart.selectors';

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
export class DashboardComponent implements OnInit, OnDestroy {

  allProducts: any[] = [];
  products: any[] = [];
  categories: string[] = [];
  selectedCategory = 'All';
  searchProductForm!: FormGroup;
  wishlistedIds$: Observable<number[]>;
  private _wishlistedIds: number[] = [];

  suggestions: string[] = [];
  showSuggestions = false;
  searchHistory: string[] = [];
  showHistory = false;
  recentlyViewed: any[] = [];

  productsLoading = true;
  productsError = false;

  sortBy = 'default';
  maxPrice: number = 0;
  maxPriceLimit: number = 0;
  readonly starRange = [1, 2, 3, 4, 5];

  currentPage = 1;
  readonly pageSize = 10;
  get totalPages(): number { return Math.max(1, Math.ceil(this.products.length / this.pageSize)); }
  get paginatedProducts(): any[] { return this.products.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize); }
  get pageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }


  showAddedDialog = false;
  addedProductName = '';
  compareItems$: Observable<any[]>;
  cartQtyMap: Record<number, number> = {};
  flashCountdown = '';
  private countdownTimer: any;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private store: Store,
    private router: Router,
    public compareService: CompareService
  ) {
    this.wishlistedIds$ = this.store.select(selectWishlistIds);
    this.compareItems$ = this.compareService.compare$;
  }

  ngOnInit() {
    this.searchProductForm = this.fb.group({ title: [null, Validators.required] });
    this.getAllProducts();
    this.store.dispatch(loadWishlist());
    this.wishlistedIds$.subscribe(ids => { this._wishlistedIds = ids; });
    this.store.dispatch(loadCart());
    this.store.select(selectCartItems).subscribe(items => {
      this.cartQtyMap = {};
      (items || []).forEach((item: any) => { this.cartQtyMap[item.productId] = item.quantity; });
    });
    this.loadRecentlyViewed();
    this.loadSearchHistory();
    this.startFlashCountdown();

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
    this.saveSearchHistory(name);
    this.submitForm();
  }

  hideSuggestions() { setTimeout(() => { this.showSuggestions = false; this.showHistory = false; }, 150); }

  onSearchFocus() {
    const val = this.searchProductForm.get('title')!.value;
    if (!val && this.searchHistory.length > 0) {
      this.showHistory = true;
    }
  }

  pickHistory(term: string) {
    this.searchProductForm.patchValue({ title: term });
    this.showHistory = false;
    this.submitForm();
  }

  clearHistory() {
    this.searchHistory = [];
    localStorage.removeItem('sk_search_history');
    this.showHistory = false;
  }

  private loadSearchHistory() {
    try {
      const raw = localStorage.getItem('sk_search_history');
      this.searchHistory = raw ? JSON.parse(raw) : [];
    } catch { this.searchHistory = []; }
  }

  private saveSearchHistory(term: string) {
    const t = term.trim();
    if (!t) return;
    this.searchHistory = [t, ...this.searchHistory.filter(h => h !== t)].slice(0, 5);
    localStorage.setItem('sk_search_history', JSON.stringify(this.searchHistory));
  }

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
    this.productsLoading = true;
    this.productsError = false;
    this.customerService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.map((p: any) => ({
          ...p,
          processedImg: p.imgUrl || (p.byteImg ? 'data:image/jpeg;base64,' + p.byteImg : null)
        }));
        this.categories = [...new Set<string>(
          this.allProducts.map(p => p.categoryName).filter(Boolean)
        )];
        const prices = this.allProducts.map(p => p.price ?? 0).filter(v => v > 0);
        this.maxPriceLimit = prices.length > 0 ? Math.max(...prices) : 100000;
        this.maxPrice = this.maxPriceLimit;
        this.applyFilter();
        this.productsLoading = false;
      },
      error: () => {
        this.productsLoading = false;
        this.productsError = true;
      }
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    this.currentPage = 1;
    this.applyFilter();
  }

  setSortBy(sort: string) {
    this.sortBy = sort;
    this.currentPage = 1;
    this.applyFilter();
  }

  resetFilters() {
    this.sortBy = 'default';
    this.maxPrice = this.maxPriceLimit;
    this.selectedCategory = 'All';
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter() {
    let filtered = this.selectedCategory === 'All'
      ? [...this.allProducts]
      : this.allProducts.filter(p => p.categoryName === this.selectedCategory);

    filtered = filtered.filter(p => p.price == null || p.price <= this.maxPrice);

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
    this.saveSearchHistory(title);
    this.customerService.getAllProductsByName(title).subscribe(res => {
      this.allProducts = res.map((p: any) => ({
        ...p,
        processedImg: p.imgUrl || (p.byteImg ? 'data:image/jpeg;base64,' + p.byteImg : null)
      }));
      this.selectedCategory = 'All';
      this.sortBy = 'default';
      this.currentPage = 1;
      this.categories = [...new Set<string>(
        this.allProducts.map(p => p.categoryName).filter(Boolean)
      )];
      const prices = this.allProducts.map(p => p.price ?? 0).filter(v => v > 0);
      this.maxPriceLimit = prices.length > 0 ? Math.max(...prices) : 100000;
      this.maxPrice = this.maxPriceLimit;
      this.applyFilter();
    });
  }

  clearSearch() {
    this.searchProductForm.reset();
    this.getAllProducts();
  }

  addToCart(id: any, name: string, inStock: boolean, event: Event) {
    event.stopPropagation();
    if (!inStock) return;
    this.customerService.addToCart(id).subscribe({
      next: () => {
        this.addedProductName = name;
        this.showAddedDialog = true;
        this.store.dispatch(loadCart());
      },
      error: (err: any) => {
        const detail = err.status === 409 ? `${name} is already in your cart.` : 'Could not add to cart. Please try again.';
        this.messageService.add({ severity: err.status === 409 ? 'warn' : 'error', summary: err.status === 409 ? 'Already in Cart' : 'Error', detail, life: 3000 });
      }
    });
  }

  getCartQty(productId: number): number {
    return this.cartQtyMap[productId] ?? 0;
  }

  increaseQty(productId: number, event: Event) {
    event.stopPropagation();
    this.store.dispatch(increaseQuantity({ productId }));
  }

  decreaseQty(productId: number, currentQty: number, event: Event) {
    event.stopPropagation();
    if (currentQty > 1) {
      this.store.dispatch(decreaseQuantity({ productId }));
    } else {
      this.store.dispatch(removeFromCart({ productId }));
    }
  }

  goToCart() { this.showAddedDialog = false; this.router.navigateByUrl('/customer/cart'); }
  continueShopping() { this.showAddedDialog = false; }

  ngOnDestroy() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  }

  private startFlashCountdown() {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      this.flashCountdown = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    };
    tick();
    this.countdownTimer = setInterval(tick, 1000);
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
