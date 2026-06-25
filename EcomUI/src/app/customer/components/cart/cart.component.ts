import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCart, increaseQuantity, decreaseQuantity, applyCoupon, removeFromCart } from '../../../store/cart/cart.actions';
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
  showOrderDialog = false;
  dialogAmount = 0;
  deliveryEstimate = '';

  constructor(private store: Store, private fb: FormBuilder) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.order$ = this.store.select(selectCartOrder);
    this.loading$ = this.store.select(selectCartLoading);
  }

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    });
    this.store.dispatch(loadCart());
    this.deliveryEstimate = this.getDeliveryEstimate();
  }

  private getDeliveryEstimate(): string {
    const addBizDays = (d: Date, n: number): Date => {
      const r = new Date(d);
      let c = 0;
      while (c < n) { r.setDate(r.getDate() + 1); if (r.getDay() !== 0 && r.getDay() !== 6) c++; }
      return r;
    };
    const fmt = (d: Date) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    return `${fmt(addBizDays(new Date(), 3))} – ${fmt(addBizDays(new Date(), 5))}`;
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

  removeProduct(productId: any) {
    this.store.dispatch(removeFromCart({ productId }));
  }

  placeOrder(order: any) {
    this.dialogAmount = order?.amount ?? 0;
    this.showOrderDialog = true;
  }
}
