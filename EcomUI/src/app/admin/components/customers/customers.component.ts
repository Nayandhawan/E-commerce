import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
