import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompareService } from '../../../services/compare/compare.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss'
})
export class CompareComponent implements OnInit {
  products: any[] = [];
  attrs = [
    { label: 'Price', key: 'price', prefix: '₹' },
    { label: 'Category', key: 'categoryName', prefix: '' },
    { label: 'Rating', key: 'averageRating', prefix: '', suffix: ' ★' },
    { label: 'Stock', key: 'stockQuantity', prefix: '', suffix: ' units' },
    { label: 'Description', key: 'description', prefix: '' },
  ];

  constructor(private compareService: CompareService, private router: Router) {}

  ngOnInit() {
    this.products = this.compareService.getAll();
    if (this.products.length < 2) this.router.navigateByUrl('/customer/dashboard');
  }

  remove(id: number) {
    this.compareService.toggle(this.products.find(p => p.id === id));
    this.products = this.compareService.getAll();
    if (this.products.length < 2) this.router.navigateByUrl('/customer/dashboard');
  }

  getValue(p: any, key: string): string {
    const v = p[key];
    if (v == null) return '—';
    return String(v);
  }
}
