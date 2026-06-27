import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCart } from '../store/cart/cart.actions';
import { loadWishlist } from '../store/wishlist/wishlist.actions';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadCart());
    this.store.dispatch(loadWishlist());
  }
}
