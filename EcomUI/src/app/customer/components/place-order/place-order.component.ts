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
  deliveryEstimate = '';

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private customerService: CustomerService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      street:           [null, [Validators.required]],
      city:             [null, [Validators.required]],
      state:            [null, [Validators.required]],
      zipCode:          [null, [Validators.required]],
      country:          ['India'],
      orderDescription: [null],
    });
    this.deliveryEstimate = this.getDeliveryEstimate();
    this.prefillFromProfile();
  }

  private prefillFromProfile() {
    const userId = Number(UserStorageService.getUserId());
    if (!userId) return;
    this.customerService.getUserProfile(userId).subscribe({
      next: (profile: any) => {
        if (profile?.street || profile?.city) {
          this.orderForm.patchValue({
            street:  profile.street  || null,
            city:    profile.city    || null,
            state:   profile.state   || null,
            zipCode: profile.zipCode || null,
            country: profile.country || 'India',
          });
        }
      }
    });
  }

  private getDeliveryEstimate(): string {
    const addBusinessDays = (date: Date, days: number): Date => {
      const d = new Date(date);
      let count = 0;
      while (count < days) {
        d.setDate(d.getDate() + 1);
        const day = d.getDay();
        if (day !== 0 && day !== 6) count++;
      }
      return d;
    };
    const fmt = (d: Date) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    return `${fmt(addBusinessDays(new Date(), 3))} – ${fmt(addBusinessDays(new Date(), 5))}`;
  }

  placeOrder() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const v = this.orderForm.value;
    const address = `${v.street}, ${v.city}, ${v.state} - ${v.zipCode}, ${v.country}`.trim();

    const orderDto = {
      userId: UserStorageService.getUserId(),
      address,
      street: v.street, city: v.city, state: v.state, zipCode: v.zipCode, country: v.country,
      orderDescription: v.orderDescription,
    };

    this.customerService.placeOrder(orderDto).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Order Placed!', detail: 'Your order has been confirmed.', life: 5000 });
        const userId = Number(UserStorageService.getUserId());
        this.customerService.updateUserProfile(userId, {
          street: v.street, city: v.city, state: v.state, zipCode: v.zipCode, country: v.country
        }).subscribe();
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
