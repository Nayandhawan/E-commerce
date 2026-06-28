import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;
  stockEditId: number | null = null;
  stockEditValue: number = 0;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({ title: [null, [Validators.required]] });
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe(res => {
      res.forEach((element: any) => {
        element.processedImg = element.imgUrl || (element.byteImg ? 'data:image/jpeg;base64,' + element.byteImg : null);
        this.products.push(element);
      });
    });
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe(res => {
      res.forEach((element: any) => {
        element.processedImg = element.imgUrl || (element.byteImg ? 'data:image/jpeg;base64,' + element.byteImg : null);
        this.products.push(element);
      });
    });
  }

  deleteProduct(productId: number) {
    this.adminService.deleteProduct(productId).subscribe(res => {
      if (res == null) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Deleted Successfully', life: 5000 });
        this.getAllProducts();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 5000 });
      }
    });
  }

  openStockEdit(product: any) {
    this.stockEditId = product.id;
    this.stockEditValue = product.stockQuantity ?? 0;
  }

  cancelStockEdit() {
    this.stockEditId = null;
  }

  saveStock(product: any) {
    const qty = Number(this.stockEditValue);
    if (isNaN(qty) || qty < 0) return;
    this.adminService.updateStock(product.id, qty).subscribe({
      next: () => {
        product.stockQuantity = qty;
        this.stockEditId = null;
        this.messageService.add({ severity: 'success', summary: 'Stock Updated', detail: `${product.name}: ${qty} units`, life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not update stock', life: 3000 });
      }
    });
  }

  markOutOfStock(product: any) {
    this.adminService.updateStock(product.id, 0).subscribe({
      next: () => {
        product.stockQuantity = 0;
        this.messageService.add({ severity: 'warn', summary: 'Out of Stock', detail: `${product.name} marked as out of stock`, life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not update stock', life: 3000 });
      }
    });
  }

  restoreStock(product: any) {
    this.adminService.updateStock(product.id, 100).subscribe({
      next: () => {
        product.stockQuantity = 100;
        this.messageService.add({ severity: 'success', summary: 'Stock Restored', detail: `${product.name}: 100 units`, life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not restore stock', life: 3000 });
      }
    });
  }
}
