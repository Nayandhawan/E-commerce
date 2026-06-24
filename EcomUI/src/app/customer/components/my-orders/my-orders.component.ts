import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  myOrders: any[] = [];
  cancellingId: number | null = null;

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {
    this.customerService.getOrdersByUserId().subscribe(res => {
      this.myOrders = res;
    });
  }

  canCancel(order: any): boolean {
    return order.orderStatus === 'PLACED';
  }

  cancelOrder(orderId: number) {
    this.cancellingId = orderId;
    this.customerService.cancelOrder(orderId).subscribe({
      next: () => {
        this.cancellingId = null;
        this.messageService.add({ severity: 'success', summary: 'Order Cancelled', detail: 'Your order has been cancelled.', life: 4000 });
        this.getMyOrders();
      },
      error: (err) => {
        this.cancellingId = null;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error || 'Could not cancel the order.', life: 4000 });
      }
    });
  }
}
