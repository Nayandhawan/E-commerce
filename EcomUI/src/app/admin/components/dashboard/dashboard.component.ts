import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  allProducts: any[] = [];
  searchProductForm!: FormGroup;
  stockEditId: number | null = null;
  stockEditValue: number = 0;
  activeTab: 'all' | 'in-stock' | 'low-stock' | 'oos' = 'all';

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({ title: [null, [Validators.required]] });
  }

  get filteredProducts(): any[] {
    switch (this.activeTab) {
      case 'in-stock':  return this.allProducts.filter(p => p.stockQuantity > 10);
      case 'low-stock': return this.allProducts.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 10);
      case 'oos':       return this.allProducts.filter(p => p.stockQuantity === 0);
      default:          return this.allProducts;
    }
  }

  get inStockCount()  { return this.allProducts.filter(p => p.stockQuantity > 10).length; }
  get lowStockCount() { return this.allProducts.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 10).length; }
  get oosCount()      { return this.allProducts.filter(p => p.stockQuantity === 0).length; }

  setTab(tab: 'all' | 'in-stock' | 'low-stock' | 'oos') {
    this.activeTab = tab;
    this.stockEditId = null;
  }

  getAllProducts() {
    this.allProducts = [];
    this.adminService.getAllProducts().subscribe(res => {
      this.allProducts = res.map((el: any) => ({
        ...el,
        processedImg: el.imgUrl || (el.byteImg ? 'data:image/jpeg;base64,' + el.byteImg : null)
      }));
    });
  }

  submitForm() {
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe(res => {
      this.allProducts = res.map((el: any) => ({
        ...el,
        processedImg: el.imgUrl || (el.byteImg ? 'data:image/jpeg;base64,' + el.byteImg : null)
      }));
      this.activeTab = 'all';
    });
  }

  clearSearch() {
    this.searchProductForm.reset();
    this.getAllProducts();
  }

  deleteProduct(productId: number) {
    this.adminService.deleteProduct(productId).subscribe(res => {
      if (res == null) {
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Product removed', life: 3000 });
        this.getAllProducts();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
      }
    });
  }

  openStockEdit(product: any) {
    this.stockEditId = product.id;
    this.stockEditValue = product.stockQuantity ?? 0;
  }

  cancelStockEdit() { this.stockEditId = null; }

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
        this.messageService.add({ severity: 'warn', summary: 'Marked OOS', detail: product.name, life: 3000 });
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
