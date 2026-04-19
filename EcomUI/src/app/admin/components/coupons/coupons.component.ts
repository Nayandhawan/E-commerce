import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CouponsComponent {
  coupons: any[] = [];
  couponForm: FormGroup;
  editingCoupon: any = null;

  // Filter
  filterMonth: number | null = null;
  filterYear: number | null = null;

  months = [
    { label: 'January', value: 1 }, { label: 'February', value: 2 },
    { label: 'March', value: 3 },   { label: 'April', value: 4 },
    { label: 'May', value: 5 },     { label: 'June', value: 6 },
    { label: 'July', value: 7 },    { label: 'August', value: 8 },
    { label: 'September', value: 9 },{ label: 'October', value: 10 },
    { label: 'November', value: 11 },{ label: 'December', value: 12 },
  ];

  years: number[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      name:           [null, [Validators.required]],
      code:           [null, [Validators.required]],
      discount:       [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      expirationDate: [null, [Validators.required]]
    });
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 2; y <= currentYear + 5; y++) this.years.push(y);
    this.getCoupons();
  }

  getCoupons() {
    const now = new Date();
    this.adminService.getCouponsByMonthYear(now.getMonth() + 1, now.getFullYear()).subscribe(res => {
      const all: any[] = Array.isArray(res) ? res : (res ? [res] : []);
      this.coupons = all.filter(c => !this.isExpired(c.expirationDate));
    });
  }

  submitForm() {
    if (this.editingCoupon) {
      this.updateCoupon();
    } else {
      this.addCoupon();
    }
  }

  addCoupon() {
    if (this.couponForm.valid) {
      const payload = { ...this.couponForm.value, discount: Number(this.couponForm.value.discount) };
      this.adminService.addCoupon(payload).subscribe(res => {
        if (res.id != null) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Coupon added successfully', life: 4000 });
          this.couponForm.reset();
          this.getCoupons();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 4000 });
        }
      });
    } else {
      this.couponForm.markAllAsTouched();
    }
  }

  editCoupon(coupon: any) {
    this.editingCoupon = coupon;
    this.couponForm.patchValue({
      name:           coupon.name,
      code:           coupon.code,
      discount:       coupon.discount,
      expirationDate: new Date(coupon.expirationDate)
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.editingCoupon = null;
    this.couponForm.reset();
  }

  updateCoupon() {
    if (this.couponForm.valid) {
      const payload = { ...this.couponForm.value, discount: Number(this.couponForm.value.discount) };
      this.adminService.updateCoupon(this.editingCoupon.id, payload).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Coupon updated successfully', life: 4000 });
          this.editingCoupon = null;
          this.couponForm.reset();
          this.getCoupons();
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update coupon', life: 4000 })
      });
    } else {
      this.couponForm.markAllAsTouched();
    }
  }

  deleteCoupon(coupon: any) {
    this.adminService.deleteCoupon(coupon.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Coupon deleted successfully', life: 4000 });
        if (this.editingCoupon?.id === coupon.id) this.cancelEdit();
        this.getCoupons();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete coupon', life: 4000 })
    });
  }

  filterCoupons() {
    if (this.filterMonth && this.filterYear) {
      this.adminService.getCouponsByMonthYear(this.filterMonth, this.filterYear).subscribe(res => {
        this.coupons = Array.isArray(res) ? res : (res ? [res] : []);
      });
    }
  }

  clearFilter() {
    this.filterMonth = null;
    this.filterYear = null;
    this.getCoupons();
  }

  discountColor(discount: number): string {
    if (discount >= 30) return 'var(--success)';
    if (discount >= 15) return 'var(--warning)';
    return 'var(--accent)';
  }

  isExpired(date: string): boolean {
    return new Date(date) < new Date();
  }
}
