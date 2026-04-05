import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomerService } from '../../customer/services/customer.service';
import {
  loadCart, loadCartSuccess, loadCartFailure,
  increaseQuantity, decreaseQuantity, quantityChangeSuccess, quantityChangeFailure,
  applyCoupon, applyCouponSuccess, applyCouponFailure
} from './cart.actions';

@Injectable()
export class CartEffects {
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCart),
      switchMap(() =>
        this.customerService.getCartByUserId().pipe(
          map(res => {
            const cartItems = (res.cartItems ?? []).map((item: any) => ({
              ...item,
              processedImg: item.returnedImg ? 'data:image/jpeg;base64,' + item.returnedImg : null
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
            this.snackBar.open('Product Quantity Increased', 'Close', { duration: 5000 });
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
            this.snackBar.open('Product Quantity Decreased', 'Close', { duration: 5000 });
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
            this.snackBar.open('Coupon Applied Successfully', 'Close', { duration: 5000 });
            return applyCouponSuccess();
          }),
          catchError(err => {
            this.snackBar.open(err.error ?? 'Failed to apply coupon', 'Close', { duration: 5000 });
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

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}
}
