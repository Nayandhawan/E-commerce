import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { loadCart, increaseQuantity, decreaseQuantity, applyCoupon } from '../../../store/cart/cart.actions';
import { selectCartItems, selectCartOrder, selectCartLoading } from '../../../store/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartItems$: Observable<any[]>;
  order$: Observable<any>;
  loading$: Observable<boolean>;
  couponForm!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.order$ = this.store.select(selectCartOrder);
    this.loading$ = this.store.select(selectCartLoading);
  }

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    });
    this.store.dispatch(loadCart());
  }

  applyCoupon() {
    const code = this.couponForm.get(['code'])!.value;
    this.store.dispatch(applyCoupon({ code }));
  }

  increaseProductQuantity(productId: any) {
    this.store.dispatch(increaseQuantity({ productId }));
  }

  decreaseProductQuantity(productId: any) {
    this.store.dispatch(decreaseQuantity({ productId }));
  }

  placeOrder(order: any) {
    this.dialog.open(PlaceOrderComponent, { data: { amount: order?.amount } });
  }
}
