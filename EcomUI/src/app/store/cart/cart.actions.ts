import { createAction, props } from '@ngrx/store';

export const loadCart = createAction('[Cart] Load Cart');
export const loadCartSuccess = createAction('[Cart] Load Cart Success', props<{ order: any; cartItems: any[] }>());
export const loadCartFailure = createAction('[Cart] Load Cart Failure', props<{ error: string }>());

export const increaseQuantity = createAction('[Cart] Increase Quantity', props<{ productId: any }>());
export const decreaseQuantity = createAction('[Cart] Decrease Quantity', props<{ productId: any }>());
export const quantityChangeSuccess = createAction('[Cart] Quantity Change Success');
export const quantityChangeFailure = createAction('[Cart] Quantity Change Failure', props<{ error: string }>());

export const applyCoupon = createAction('[Cart] Apply Coupon', props<{ code: string }>());
export const applyCouponSuccess = createAction('[Cart] Apply Coupon Success');
export const applyCouponFailure = createAction('[Cart] Apply Coupon Failure', props<{ error: string }>());

export const removeCoupon = createAction('[Cart] Remove Coupon');
export const removeCouponSuccess = createAction('[Cart] Remove Coupon Success');
export const removeCouponFailure = createAction('[Cart] Remove Coupon Failure', props<{ error: string }>());

export const removeFromCart = createAction('[Cart] Remove From Cart', props<{ productId: any }>());
export const removeFromCartSuccess = createAction('[Cart] Remove From Cart Success');
export const removeFromCartFailure = createAction('[Cart] Remove From Cart Failure', props<{ error: string }>());
