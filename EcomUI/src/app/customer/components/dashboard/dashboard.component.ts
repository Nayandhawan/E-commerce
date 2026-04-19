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

  clearSearch() {
    this.searchProductForm.reset();
    this.getAllProducts();
  }

  addToCart(id: any) {
    this.customerService.addToCart(id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart!', life: 3000 });
    });
  }

  getCatIcon(cat: string): string {
    const key = cat.toLowerCase().split(' ')[0];
    return CAT_ICONS[key] ?? 'square-stack';
  }
}
