import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../services/customer.service';
import { loadCart, increaseQuantity, decreaseQuantity, applyCoupon, removeCoupon, removeFromCart } from '../../../store/cart/cart.actions';
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
  availableCoupons: any[] = [];
  showOrderDialog = false;
  dialogAmount = 0;
  deliveryEstimate = '';

  constructor(private store: Store, private fb: FormBuilder, private customerService: CustomerService, private messageService: MessageService) {
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
    this.customerService.getAvailableCoupons().subscribe(c => this.availableCoupons = c);
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
    const code = (this.couponForm.get('code')!.value || '').trim();
    if (!code) return;
    const matched = this.availableCoupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (matched) {
      this.cartItems$.pipe(take(1)).subscribe(items => {
        if (!this.isCouponApplicable(matched, items || [])) {
          this.messageService.add({ severity: 'error', summary: 'Coupon not applicable', detail: 'This coupon is not valid for the products in your cart', life: 4000 });
          return;
        }
        this.store.dispatch(applyCoupon({ code }));
      });
    } else {
      this.store.dispatch(applyCoupon({ code }));
    }
  }

  fillCouponCode(code: string) {
    this.couponForm.patchValue({ code });
  }

  removeCoupon() {
    this.store.dispatch(removeCoupon());
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

  isCouponApplicable(coupon: any, cartItems: any[]): boolean {
    const noCats = !coupon.applicableCategoryIds?.length;
    const noProds = !coupon.applicableProductIds?.length;
    if (noCats && noProds) return true;
    // Product-level targeting takes full precedence
    if (!noProds) {
      return cartItems.some(item => coupon.applicableProductIds.includes(item.productId));
    }
    // Category-only targeting
    return cartItems.some(item => coupon.applicableCategoryIds.includes(item.categoryId));
  }

  couponLabel(coupon: any): string {
    const prefix = coupon.couponType === 'CAPPED_PERCENTAGE' ? 'Upto ' : '';
    const cap = coupon.maxDiscount ? `, max ₹${coupon.maxDiscount}` : '';
    return `${prefix}${coupon.discount}% off${cap}`;
  }

  isProductDiscounted(productId: any, order: any): boolean {
    return order?.discountedProductIds?.includes(productId) ?? false;
  }
}
