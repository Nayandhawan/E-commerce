import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  register(signupRequest: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${BASIC_URL}api/auth/signup`, signupRequest, { headers });
  }

  login(username: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };
    return this.http.post<any>(`${BASIC_URL}api/auth/login`, body, { headers }).pipe(
      map((res) => {
        if (res && res.token) {
          this.userStorageService.saveToken(res.token);
          this.userStorageService.saveUser(res);
          return true;
        }
        return false;
      })
    );
  }

  getOrderByTrackingId(trackingId: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/cart/track/${trackingId}`);
  }
}
