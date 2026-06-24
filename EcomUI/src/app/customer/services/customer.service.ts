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
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };
    return this.http.post(environment.apiUrl + `api/customer/cart`, cartDto, {
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

  giveReview(reviewDto: any): Observable<any> {
    return this.http.post(environment.apiUrl + `api/customer/reviews`, reviewDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  increaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };
    return this.http.put(environment.apiUrl + `api/customer/cart/increase`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  descreaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };
    return this.http.put(environment.apiUrl + `api/customer/cart/decrease`, cartDto, {
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
