import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadWishlist, removeFromWishlist } from '../../../store/wishlist/wishlist.actions';
import { selectWishlistProducts } from '../../../store/wishlist/wishlist.selectors';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrl: './view-wishlist.component.scss'
})
export class ViewWishlistComponent implements OnInit {

  products$: Observable<any[]>;

  constructor(
    private store: Store,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {
    this.products$ = this.store.select(selectWishlistProducts);
  }

  ngOnInit() {
    this.store.dispatch(loadWishlist());
  }

  removeFromWishlist(productId: number) {
    this.store.dispatch(removeFromWishlist({ productId }));
  }

  moveToCart(productId: number) {
    this.customerService.addToCart(productId).subscribe({
      next: () => this.snackBar.open('Added to cart!', 'Close', { duration: 2000 }),
      error: () => this.snackBar.open('Could not add to cart', 'Close', { duration: 2000 })
    });
  }
}
