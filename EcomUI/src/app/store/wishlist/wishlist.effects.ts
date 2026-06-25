import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
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
  private actions$ = inject(Actions);
  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);

  loadWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWishlist),
      switchMap(() =>
        this.customerService.getWishlistByUserId().pipe(
          map((res: any[]) => {
            const products = res.map((item: any) => ({
              ...item,
              processedImg: item.imgUrl || (item.byteImg ? 'data:image/jpeg;base64,' + item.byteImg : null)
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
            this.messageService.add({ severity: 'success', summary: 'Wishlist', detail: 'Added to wishlist!', life: 2000 });
            return addToWishlistSuccess({ productId });
          }),
          catchError(() => {
            this.messageService.add({ severity: 'error', summary: 'Wishlist', detail: 'Could not add to wishlist', life: 2000 });
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
            this.messageService.add({ severity: 'info', summary: 'Wishlist', detail: 'Removed from wishlist', life: 2000 });
            return removeFromWishlistSuccess({ productId });
          }),
          catchError(() => {
            this.messageService.add({ severity: 'error', summary: 'Wishlist', detail: 'Could not remove from wishlist', life: 2000 });
            return of(removeFromWishlistFailure({ error: 'Failed' }));
          })
        )
      )
    )
  );
}
