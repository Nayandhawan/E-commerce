import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: string): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken():string {
    return localStorage.getItem(TOKEN);
  }

  static setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  static getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  static setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  static getUser():any {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId():string {
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.userId;
  }

  static getUserRole():string {
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.role;
  }

  static isAdminLoggedIn():boolean{
    if(this.getToken === null){
      console.log(JSON.stringify(this.getToken));
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'ADMIN';
  }

  static isCustomerLoggedIn():boolean{
    if(this.getToken === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CUSTOMER';
  }

  static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
