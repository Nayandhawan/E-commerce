import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from './wishlist.reducer';

export const selectWishlistState = createFeatureSelector<WishlistState>('wishlist');

export const selectWishlistProducts = createSelector(selectWishlistState, s => s.products);
export const selectWishlistIds = createSelector(selectWishlistState, s => s.ids);
export const selectWishlistLoaded = createSelector(selectWishlistState, s => s.loaded);
