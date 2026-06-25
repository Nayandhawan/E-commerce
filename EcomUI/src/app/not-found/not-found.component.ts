import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    if (UserStorageService.isCustomerLoggedIn()) {
      this.router.navigateByUrl('/customer/dashboard');
    } else if (UserStorageService.isAdminLoggedIn()) {
      this.router.navigateByUrl('/admin/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
