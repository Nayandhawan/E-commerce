import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent implements OnInit {
  @Input() amount: number = 0;
  @Output() orderPlaced = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  orderForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null],
    });
  }

  placeOrder() {
    if (this.orderForm.invalid) return;
    this.loading = true;

    const orderDto = {
      userId: UserStorageService.getUserId(),
      address: this.orderForm.value.address,
      orderDescription: this.orderForm.value.orderDescription,
    };

    this.customerService.placeOrder(orderDto).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Order Placed!', detail: 'Your order has been confirmed.', life: 5000 });
        this.orderPlaced.emit();
        this.router.navigateByUrl('/customer/my_orders');
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not place order. Please try again.', life: 4000 });
      }
    });
  }

  cancel() { this.cancelled.emit(); }
}
