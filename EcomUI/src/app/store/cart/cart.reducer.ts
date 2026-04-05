import { createReducer, on } from '@ngrx/store';
import {
  loadCart, loadCartSuccess, loadCartFailure,
  increaseQuantity, decreaseQuantity,
  applyCoupon, applyCouponSuccess, applyCouponFailure
} from './cart.actions';

export interface CartState {
  order: any | null;
  cartItems: any[];
  loading: boolean;
  error: string | null;
}

export const initialCartState: CartState = {
  order: null,
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialCartState,
  on(loadCart, state => ({ ...state, loading: true, error: null })),
  on(loadCartSuccess, (state, { order, cartItems }) => ({ ...state, order, cartItems, loading: false })),
  on(loadCartFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(increaseQuantity, decreaseQuantity, state => ({ ...state, loading: true })),
  on(applyCoupon, state => ({ ...state, loading: true, error: null })),
  on(applyCouponSuccess, state => ({ ...state, loading: false })),
  on(applyCouponFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
