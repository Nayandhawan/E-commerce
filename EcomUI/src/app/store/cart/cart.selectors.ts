import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(selectCartState, s => s.cartItems);
export const selectCartOrder = createSelector(selectCartState, s => s.order);
export const selectCartLoading = createSelector(selectCartState, s => s.loading);
