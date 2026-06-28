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
  savedAddresses: any[] = [];
  selectedSavedAddressId: number | null = null;

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
    this.loadSavedAddresses();
  }

  private loadSavedAddresses(): void {
    this.customerService.getSavedAddresses().subscribe({
      next: (addrs) => {
        this.savedAddresses = addrs;
        const def = addrs.find(a => a.isDefault);
        if (def) this.applySavedAddress(def);
      },
      error: () => {}
    });
  }

  applySavedAddress(addr: any): void {
    this.selectedSavedAddressId = addr.id;
    this.orderForm.patchValue({
      street: addr.street, city: addr.city, state: addr.state,
      zipCode: addr.zipCode, country: addr.country || 'India',
    });
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

    // Step 1: Create Razorpay order on backend
    this.customerService.createPaymentOrder(this.amount).subscribe({
      next: (paymentOrder: any) => {
        this.loading = false;
        const options = {
          key: paymentOrder.keyId,
          amount: paymentOrder.amount * 100,
          currency: 'INR',
          name: 'ShopKart',
          description: 'Order Payment',
          order_id: paymentOrder.razorpayOrderId,
          handler: (response: any) => {
            // Step 2: Verify payment signature on backend
            this.customerService.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }).subscribe({
              next: () => {
                // Step 3: Place the order
                this.loading = true;
                this.customerService.placeOrder(orderDto).subscribe({
                  next: () => {
                    this.loading = false;
                    this.messageService.add({ severity: 'success', summary: 'Order Placed!', detail: 'Payment successful. Your order is confirmed.', life: 5000 });
                    const userId = Number(UserStorageService.getUserId());
                    this.customerService.updateUserProfile(userId, {
                      street: v.street, city: v.city, state: v.state, zipCode: v.zipCode, country: v.country
                    }).subscribe();
                    this.orderPlaced.emit();
                    this.router.navigateByUrl('/customer/my_orders');
                  },
                  error: () => {
                    this.loading = false;
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Payment received but order placement failed. Contact support.', life: 6000 });
                  }
                });
              },
              error: () => {
                this.messageService.add({ severity: 'error', summary: 'Payment Failed', detail: 'Payment verification failed. Please try again.', life: 5000 });
              }
            });
          },
          prefill: {
            name: UserStorageService.getUser()?.name || '',
          },
          theme: { color: '#f59e0b' },
          modal: {
            ondismiss: () => {
              this.messageService.add({ severity: 'warn', summary: 'Payment Cancelled', detail: 'You cancelled the payment.', life: 3000 });
            }
          }
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not initiate payment. Please try again.', life: 4000 });
      }
    });
  }

  cancel() { this.cancelled.emit(); }
}
