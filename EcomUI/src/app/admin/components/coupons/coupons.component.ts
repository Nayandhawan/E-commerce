import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CouponsComponent implements OnDestroy {
  coupons: any[] = [];
  couponForm!: FormGroup;
  editingCoupon: any = null;

  filterMonth: number = new Date().getMonth() + 1;
  filterYear: number = new Date().getFullYear();

  categories: any[] = [];
  allProducts: any[] = [];
  filteredProducts: any[] = [];

  private catSub!: Subscription;

  couponTypeOptions = [
    { label: 'Flat %', value: 'PERCENTAGE' },
    { label: 'Upto % (capped)', value: 'CAPPED_PERCENTAGE' }
  ];

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
      name:                  [null, [Validators.required]],
      code:                  [null, [Validators.required]],
      discount:              [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      expirationDate:        [null, [Validators.required]],
      couponType:            ['PERCENTAGE'],
      maxDiscount:           [null],
      minOrderAmount:        [null],
      applicableCategoryIds: [[]],
      applicableProductIds:  [[]]
    });

    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 2; y <= currentYear + 5; y++) this.years.push(y);

    this.getCoupons();

    this.adminService.getAllCategories().subscribe((res: any[]) => {
      this.categories = res.map((c: any) => ({ label: c.name, value: c.id }));
    });

    this.adminService.getAllProducts().subscribe((res: any[]) => {
      this.allProducts = res.map((p: any) => ({ label: p.name, value: p.id, categoryId: p.categoryId }));
      this.filteredProducts = [...this.allProducts];
    });

    // Filter products whenever selected categories change
    this.catSub = this.couponForm.get('applicableCategoryIds')!.valueChanges.subscribe((selectedCatIds: number[]) => {
      this.updateFilteredProducts(selectedCatIds);
    });
  }

  ngOnDestroy(): void {
    this.catSub?.unsubscribe();
  }

  private updateFilteredProducts(selectedCatIds: number[]): void {
    if (!selectedCatIds || selectedCatIds.length === 0) {
      this.filteredProducts = [...this.allProducts];
      return;
    }
    this.filteredProducts = this.allProducts.filter(p => selectedCatIds.includes(p.categoryId));

    // Remove any selected products no longer in the filtered list
    const currentProdIds: number[] = this.couponForm.get('applicableProductIds')!.value || [];
    const validProdIds = currentProdIds.filter(id => this.filteredProducts.some(p => p.value === id));
    if (validProdIds.length !== currentProdIds.length) {
      this.couponForm.get('applicableProductIds')!.setValue(validProdIds, { emitEvent: false });
    }
  }

  get isCapped(): boolean {
    return this.couponForm.get('couponType')?.value === 'CAPPED_PERCENTAGE';
  }

  getCoupons() {
    this.adminService.getCouponsByMonthYear(this.filterMonth, this.filterYear).subscribe(res => {
      const all: any[] = Array.isArray(res) ? res : (res ? [res] : []);
      this.coupons = all.filter(c => !this.isExpired(c.expirationDate));
    });
  }

  submitForm() {
    if (this.editingCoupon) { this.updateCoupon(); } else { this.addCoupon(); }
  }

  private buildPayload(): any {
    const v = this.couponForm.value;
    return {
      name: v.name,
      code: v.code,
      discount: Number(v.discount),
      expirationDate: v.expirationDate,
      couponType: v.couponType || 'PERCENTAGE',
      maxDiscount: v.couponType === 'CAPPED_PERCENTAGE' && v.maxDiscount ? Number(v.maxDiscount) : null,
      minOrderAmount: v.minOrderAmount ? Number(v.minOrderAmount) : null,
      applicableCategoryIds: v.applicableCategoryIds || [],
      applicableProductIds: v.applicableProductIds || []
    };
  }

  addCoupon() {
    if (this.couponForm.valid) {
      this.adminService.addCoupon(this.buildPayload()).subscribe(res => {
        if (res.id != null) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Coupon added successfully', life: 4000 });
          this.couponForm.reset({ couponType: 'PERCENTAGE', applicableCategoryIds: [], applicableProductIds: [] });
          this.filteredProducts = [...this.allProducts];
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
    const catIds = coupon.applicableCategoryIds || [];
    this.updateFilteredProducts(catIds);
    this.couponForm.patchValue({
      name: coupon.name,
      code: coupon.code,
      discount: coupon.discount,
      expirationDate: new Date(coupon.expirationDate),
      couponType: coupon.couponType || 'PERCENTAGE',
      maxDiscount: coupon.maxDiscount || null,
      minOrderAmount: coupon.minOrderAmount || null,
      applicableCategoryIds: catIds,
      applicableProductIds: coupon.applicableProductIds || []
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.editingCoupon = null;
    this.couponForm.reset({ couponType: 'PERCENTAGE', applicableCategoryIds: [], applicableProductIds: [] });
    this.filteredProducts = [...this.allProducts];
  }

  updateCoupon() {
    if (this.couponForm.valid) {
      this.adminService.updateCoupon(this.editingCoupon.id, this.buildPayload()).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Coupon updated successfully', life: 4000 });
          this.editingCoupon = null;
          this.couponForm.reset({ couponType: 'PERCENTAGE', applicableCategoryIds: [], applicableProductIds: [] });
          this.filteredProducts = [...this.allProducts];
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
    this.adminService.getCouponsByMonthYear(this.filterMonth, this.filterYear).subscribe(res => {
      this.coupons = Array.isArray(res) ? res : (res ? [res] : []);
    });
  }

  clearFilter() {
    this.filterMonth = new Date().getMonth() + 1;
    this.filterYear = new Date().getFullYear();
    this.getCoupons();
  }

  couponScope(coupon: any): string {
    const cats = coupon.applicableCategoryIds?.length || 0;
    const prods = coupon.applicableProductIds?.length || 0;
    if (!cats && !prods) return 'All products';
    const parts: string[] = [];
    if (cats) parts.push(`${cats} categor${cats > 1 ? 'ies' : 'y'}`);
    if (prods) parts.push(`${prods} product${prods > 1 ? 's' : ''}`);
    return parts.join(' + ');
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
