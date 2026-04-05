import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserStorageService } from '../../../services/storage/user-storage.service';

declare var Razorpay: any;

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent implements OnInit {
  orderForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { amount: number }
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

    this.customerService.createPaymentOrder(this.data?.amount ?? 0).subscribe({
      next: (paymentOrder) => {
        this.openRazorpay(paymentOrder);
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Could not initiate payment. Try again.', 'Close', { duration: 4000 });
      }
    });
  }

  private openRazorpay(paymentOrder: any) {
    const user = UserStorageService.getUser();
    const options = {
      key: paymentOrder.keyId,
      amount: paymentOrder.amount * 100,
      currency: paymentOrder.currency,
      name: 'ShopKart',
      description: this.orderForm.value.orderDescription || 'Order Payment',
      order_id: paymentOrder.razorpayOrderId,
      prefill: {
        name: user?.name ?? '',
        email: user?.email ?? '',
      },
      theme: { color: '#2874f0' },
      handler: (response: any) => {
        this.verifyPayment(response);
      },
      modal: {
        ondismiss: () => {
          this.loading = false;
          this.snackBar.open('Payment cancelled', 'Close', { duration: 3000 });
        }
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  }

  private verifyPayment(razorpayResponse: any) {
    const verifyDto = {
      razorpayOrderId: razorpayResponse.razorpay_order_id,
      razorpayPaymentId: razorpayResponse.razorpay_payment_id,
      razorpaySignature: razorpayResponse.razorpay_signature,
      userId: UserStorageService.getUserId(),
      address: this.orderForm.value.address,
      orderDescription: this.orderForm.value.orderDescription,
    };

    this.customerService.verifyPayment(verifyDto).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 5000 });
        this.closeForm();
        this.router.navigateByUrl('/customer/my_orders');
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Payment verification failed. Contact support.', 'Close', { duration: 5000 });
      }
    });
  }

  closeForm() {
    this.dialog.closeAll();
  }
}
