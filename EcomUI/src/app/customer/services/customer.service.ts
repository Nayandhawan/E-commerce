import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/customer/products', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/products/search?name=${encodeURIComponent(name)}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addToCart(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };
    return this.http.post(BASIC_URL + `api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCartByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  applyCoupon(code: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `api/customer/cart/${userId}/coupon?code=${encodeURIComponent(code)}`, {}, {
      headers: this.createAuthorizationHeader(),
    });
  }

  placeOrder(orderDto: any): Observable<any> {
    orderDto.userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `api/customer/cart/place-order`, orderDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrdersByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/cart/${userId}/orders`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrderedProducts(orderId: number): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/cart/${userId}/orders`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  giveReview(reviewDto: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/customer/reviews`, reviewDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  increaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };
    return this.http.put(BASIC_URL + `api/customer/cart/increase`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  descreaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    };
    return this.http.put(BASIC_URL + `api/customer/cart/decrease`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductDetailById(productId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/products/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProductToWishlist(wishlistDto: any): Observable<any> {
    const userId = wishlistDto.userId;
    const productId = wishlistDto.productId;
    return this.http.post(BASIC_URL + `api/customer/wishlist/${userId}/${productId}`, {}, {
      headers: this.createAuthorizationHeader(),
    });
  }

  removeFromWishlist(productId: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.delete(BASIC_URL + `api/customer/wishlist/${userId}/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getWishlistByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/wishlist/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + UserStorageService.getToken());
  }
}
