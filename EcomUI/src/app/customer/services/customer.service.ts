import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(environment.apiUrl + 'api/customer/products', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(environment.apiUrl + `api/customer/products/search?name=${encodeURIComponent(name)}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addToCart(productId: any): Observable<any> {
    return this.http.post(environment.apiUrl + `api/customer/cart`, { productId }, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCartByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(environment.apiUrl + `api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  applyCoupon(code: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(environment.apiUrl + `api/customer/cart/${userId}/coupon?code=${encodeURIComponent(code)}`, {}, {
      headers: this.createAuthorizationHeader(),
    });
  }

  placeOrder(orderDto: any): Observable<any> {
    orderDto.userId = UserStorageService.getUserId();
    return this.http.post(environment.apiUrl + `api/customer/cart/place-order`, orderDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAvailableCoupons(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + `api/customer/coupons`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createPaymentOrder(amount: number): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(environment.apiUrl + `api/payment/create-order`, { amount, userId }, {
      headers: this.createAuthorizationHeader(),
    });
  }

  verifyPayment(verifyDto: any): Observable<any> {
    return this.http.post(environment.apiUrl + `api/payment/verify`, verifyDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrdersByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(environment.apiUrl + `api/customer/cart/${userId}/orders`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrderedProducts(orderId: number): Observable<any> {
    return this.http.get(environment.apiUrl + `api/customer/cart/order/${orderId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  cancelOrder(orderId: number): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.patch(environment.apiUrl + `api/customer/cart/order/${orderId}/cancel?userId=${userId}`, {}, {
      headers: this.createAuthorizationHeader(),
    });
  }

  requestReturn(orderId: number, reason: string): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.patch(environment.apiUrl + `api/customer/cart/order/${orderId}/return?userId=${userId}&reason=${encodeURIComponent(reason)}`, {}, {
      headers: this.createAuthorizationHeader(),
    });
  }

  giveReview(reviewDto: any): Observable<any> {
    return this.http.post(environment.apiUrl + `api/customer/reviews`, reviewDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  increaseProductQuantity(productId: any): Observable<any> {
    return this.http.put(environment.apiUrl + `api/customer/cart/increase`, { productId }, {
      headers: this.createAuthorizationHeader(),
    });
  }

  descreaseProductQuantity(productId: any): Observable<any> {
    return this.http.put(environment.apiUrl + `api/customer/cart/decrease`, { productId }, {
      headers: this.createAuthorizationHeader(),
    });
  }

  removeFromCart(productId: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.delete(environment.apiUrl + `api/customer/cart/${userId}/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductDetailById(productId: number): Observable<any> {
    return this.http.get(environment.apiUrl + `api/customer/products/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getRelatedProducts(productId: number, category: string): Observable<any[]> {
    return this.http.get<any[]>(
      environment.apiUrl + `api/customer/products/${productId}/related?category=${encodeURIComponent(category)}`,
      { headers: this.createAuthorizationHeader() }
    );
  }

  getProductImages(productId: number): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + `api/customer/products/${productId}/images`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getSavedAddresses(): Observable<any[]> {
    const userId = UserStorageService.getUserId();
    return this.http.get<any[]>(environment.apiUrl + `api/customer/addresses/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addSavedAddress(dto: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(environment.apiUrl + `api/customer/addresses/${userId}`, dto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteSavedAddress(addressId: number): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.delete(environment.apiUrl + `api/customer/addresses/${userId}/${addressId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  setDefaultAddress(addressId: number): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.patch(environment.apiUrl + `api/customer/addresses/${userId}/${addressId}/default`, {}, {
      headers: this.createAuthorizationHeader(),
    });
  }

  checkStockSubscription(productId: number): Observable<{ subscribed: boolean }> {
    const userId = UserStorageService.getUserId();
    return this.http.get<{ subscribed: boolean }>(
      environment.apiUrl + `api/customer/products/${productId}/notify/${userId}`,
      { headers: this.createAuthorizationHeader() }
    );
  }

  subscribeToStock(productId: number): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(environment.apiUrl + `api/customer/products/${productId}/notify/${userId}`, {}, {
      headers: this.createAuthorizationHeader(),
    });
  }

  unsubscribeFromStock(productId: number): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.delete(environment.apiUrl + `api/customer/products/${productId}/notify/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProductToWishlist(wishlistDto: any): Observable<any> {
    const userId = wishlistDto.userId;
    const productId = wishlistDto.productId;
    return this.http.post(environment.apiUrl + `api/customer/wishlist/${userId}/${productId}`, {}, {
      headers: this.createAuthorizationHeader(),
    });
  }

  removeFromWishlist(productId: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.delete(environment.apiUrl + `api/customer/wishlist/${userId}/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getWishlistByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(environment.apiUrl + `api/customer/wishlist/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(environment.apiUrl + `api/customer/profile/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateUserProfile(userId: number, data: any): Observable<any> {
    return this.http.put(environment.apiUrl + `api/customer/profile/${userId}`, data, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + UserStorageService.getToken());
  }
}
