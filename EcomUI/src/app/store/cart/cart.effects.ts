import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomerService } from '../../customer/services/customer.service';
import {
  loadCart, loadCartSuccess, loadCartFailure,
  increaseQuantity, decreaseQuantity, quantityChangeSuccess, quantityChangeFailure,
  applyCoupon, applyCouponSuccess, applyCouponFailure,
  removeCoupon, removeCouponSuccess, removeCouponFailure,
  removeFromCart, removeFromCartSuccess, removeFromCartFailure
} from './cart.actions';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCart),
      switchMap(() =>
        this.customerService.getCartByUserId().pipe(
          map(res => {
            const cartItems = (res?.cartItems ?? []).map((item: any) => ({
              ...item,
              processedImg: item.imgUrl || (item.returnedImg ? 'data:image/jpeg;base64,' + item.returnedImg : null)
            }));
            return loadCartSuccess({ order: res, cartItems });
          }),
          catchError(err => of(loadCartFailure({ error: err.message ?? 'Failed to load cart' })))
        )
      )
    )
  );

  increaseQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(increaseQuantity),
      switchMap(({ productId }) =>
        this.customerService.increaseProductQuantity(productId).pipe(
          map(() => {
            this.messageService.add({ severity: 'success', summary: 'Cart', detail: 'Quantity increased', life: 2000 });
            return quantityChangeSuccess();
          }),
          catchError(err => of(quantityChangeFailure({ error: err.message })))
        )
      )
    )
  );

  decreaseQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(decreaseQuantity),
      switchMap(({ productId }) =>
        this.customerService.descreaseProductQuantity(productId).pipe(
          map(() => {
            this.messageService.add({ severity: 'info', summary: 'Cart', detail: 'Quantity decreased', life: 2000 });
            return quantityChangeSuccess();
          }),
          catchError(err => of(quantityChangeFailure({ error: err.message })))
        )
      )
    )
  );

  reloadAfterQuantityChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quantityChangeSuccess),
      map(() => loadCart())
    )
  );

  applyCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applyCoupon),
      switchMap(({ code }) =>
        this.customerService.applyCoupon(code).pipe(
          map(() => {
            this.messageService.add({ severity: 'success', summary: 'Coupon Applied', detail: 'Discount applied to your order', life: 3000 });
            return applyCouponSuccess();
          }),
          catchError(err => {
            this.messageService.add({ severity: 'error', summary: 'Invalid Coupon', detail: err.error ?? 'Failed to apply coupon', life: 4000 });
            return of(applyCouponFailure({ error: err.error }));
          })
        )
      )
    )
  );

  reloadAfterCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applyCouponSuccess),
      map(() => loadCart())
    )
  );

  removeCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCoupon),
      switchMap(() =>
        this.customerService.removeCoupon().pipe(
          map(() => {
            this.messageService.add({ severity: 'info', summary: 'Coupon Removed', detail: 'Coupon has been removed', life: 3000 });
            return removeCouponSuccess();
          }),
          catchError(err => of(removeCouponFailure({ error: err.message })))
        )
      )
    )
  );

  reloadAfterRemoveCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCouponSuccess),
      map(() => loadCart())
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromCart),
      switchMap(({ productId }) =>
        this.customerService.removeFromCart(productId).pipe(
          map(() => {
            this.messageService.add({ severity: 'success', summary: 'Cart', detail: 'Item removed', life: 2000 });
            return removeFromCartSuccess();
          }),
          catchError(err => of(removeFromCartFailure({ error: err.message })))
        )
      )
    )
  );

  reloadAfterRemove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromCartSuccess),
      map(() => loadCart())
    )
  );
}
