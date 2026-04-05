import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomerService } from '../../customer/services/customer.service';
import { UserStorageService } from '../../services/storage/user-storage.service';
import {
  loadWishlist, loadWishlistSuccess, loadWishlistFailure,
  addToWishlist, addToWishlistSuccess, addToWishlistFailure,
  removeFromWishlist, removeFromWishlistSuccess, removeFromWishlistFailure
} from './wishlist.actions';

@Injectable()
export class WishlistEffects {
  loadWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWishlist),
      switchMap(() =>
        this.customerService.getWishlistByUserId().pipe(
          map((res: any[]) => {
            const products = res.map((item: any) => ({
              ...item,
              processedImg: item.byteImg ? 'data:image/jpeg;base64,' + item.byteImg : null
            }));
            const ids = res.map((item: any) => item.productId ?? item.product?.id ?? item.id);
            return loadWishlistSuccess({ products, ids });
          }),
          catchError(err => of(loadWishlistFailure({ error: err.message ?? 'Failed to load wishlist' })))
        )
      )
    )
  );

  addToWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToWishlist),
      switchMap(({ productId }) => {
        const dto = { userId: UserStorageService.getUserId(), productId };
        return this.customerService.addProductToWishlist(dto).pipe(
          map(() => {
            this.snackBar.open('Added to wishlist!', 'Close', { duration: 2000 });
            return addToWishlistSuccess({ productId });
          }),
          catchError(() => {
            this.snackBar.open('Could not add to wishlist', 'Close', { duration: 2000 });
            return of(addToWishlistFailure({ error: 'Failed' }));
          })
        );
      })
    )
  );

  removeFromWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromWishlist),
      switchMap(({ productId }) =>
        this.customerService.removeFromWishlist(productId).pipe(
          map(() => {
            this.snackBar.open('Removed from wishlist', 'Close', { duration: 2000 });
            return removeFromWishlistSuccess({ productId });
          }),
          catchError(() => {
            this.snackBar.open('Could not remove from wishlist', 'Close', { duration: 2000 });
            return of(removeFromWishlistFailure({ error: 'Failed' }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}
}
