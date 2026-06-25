import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'api/admin/categories', categoryDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(environment.apiUrl + 'api/admin/categories', {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateCategory(id: number, categoryDto: any): Observable<any> {
    return this.http.put(environment.apiUrl + `api/admin/categories/${id}`, categoryDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + `api/admin/categories/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'api/admin/products', productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateProduct(productId: any, productDto: any): Observable<any> {
    return this.http.put(environment.apiUrl + `api/admin/products/${productId}`, productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(environment.apiUrl + 'api/admin/products', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductById(productId: any): Observable<any> {
    return this.http.get(environment.apiUrl + `api/admin/products/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(environment.apiUrl + `api/admin/products/search?name=${encodeURIComponent(name)}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(environment.apiUrl + `api/admin/products/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addCoupon(couponDto: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'api/admin/coupons', couponDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCoupons(): Observable<any> {
    return this.http.get(environment.apiUrl + 'api/admin/coupons', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCouponsByMonthYear(month: number, year: number): Observable<any> {
    return this.http.get(environment.apiUrl + `api/admin/coupons?month=${month}&year=${year}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateCoupon(id: number, couponDto: any): Observable<any> {
    return this.http.put(environment.apiUrl + `api/admin/coupons/${id}`, couponDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteCoupon(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + `api/admin/coupons/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getPlacedOrders(): Observable<any> {
    return this.http.get(environment.apiUrl + 'api/admin/orders', {
      headers: this.createAuthorizationHeader(),
    });
  }

  changeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.get(environment.apiUrl + `api/admin/orders/${orderId}/${status}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  processReturn(orderId: number, action: string): Observable<any> {
    return this.http.patch(environment.apiUrl + `api/admin/orders/${orderId}/return?action=${action}`, {}, {
      headers: this.createAuthorizationHeader(),
    });
  }

  postFAQ(productId: number, FaqDto: any): Observable<any> {
    const faqWithProduct = { ...FaqDto, productId };
    return this.http.post(environment.apiUrl + `api/admin/faq`, faqWithProduct, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAnalytics(): Observable<any> {
    return this.http.get(environment.apiUrl + 'api/admin/orders/analytics', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getSalesChart(fromYear: number, toYear: number): Observable<{ labels: string[]; amounts: number[] }> {
    return this.http.get<{ labels: string[]; amounts: number[] }>(
      environment.apiUrl + `api/admin/sales-chart?fromYear=${fromYear}&toYear=${toYear}`,
      { headers: this.createAuthorizationHeader() }
    );
  }

  getSalesReport(type: string, params: Record<string, number>): Observable<Blob> {
    let queryParams = `type=${type}`;
    for (const key of Object.keys(params)) {
      queryParams += `&${key}=${params[key]}`;
    }
    return this.http.get(environment.apiUrl + `api/admin/sales-report?${queryParams}`, {
      headers: this.createAuthorizationHeader(),
      responseType: 'blob'
    });
  }

  getVariants(productId: number): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + `api/admin/products/${productId}/variants`, {
      headers: this.createAuthorizationHeader()
    });
  }

  addVariant(productId: number, variant: { size?: string; colour?: string; stockQuantity: number }): Observable<any> {
    return this.http.post(environment.apiUrl + `api/admin/products/${productId}/variants`, variant, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteVariant(variantId: number): Observable<any> {
    return this.http.delete(environment.apiUrl + `api/admin/variants/${variantId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + UserStorageService.getToken());
  }
}
