import { createReducer, on } from '@ngrx/store';
import {
  loadWishlist, loadWishlistSuccess, loadWishlistFailure,
  addToWishlist, addToWishlistSuccess, addToWishlistFailure,
  removeFromWishlist, removeFromWishlistSuccess, removeFromWishlistFailure
} from './wishlist.actions';

export interface WishlistState {
  products: any[];
  ids: number[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialWishlistState: WishlistState = {
  products: [],
  ids: [],
  loading: false,
  loaded: false,
  error: null,
};

export const wishlistReducer = createReducer(
  initialWishlistState,
  on(loadWishlist, state => ({ ...state, loading: true, error: null })),
  on(loadWishlistSuccess, (state, { products, ids }) => ({ ...state, products, ids, loading: false, loaded: true })),
  on(loadWishlistFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(addToWishlist, state => ({ ...state, loading: true })),
  on(addToWishlistSuccess, (state, { productId }) => ({
    ...state,
    ids: [...state.ids, productId],
    loading: false
  })),
  on(addToWishlistFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(removeFromWishlist, state => ({ ...state, loading: true })),
  on(removeFromWishlistSuccess, (state, { productId }) => ({
    ...state,
    ids: state.ids.filter(id => id !== productId),
    products: state.products.filter(p => (p.productId ?? p.id) !== productId),
    loading: false
  })),
  on(removeFromWishlistFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
