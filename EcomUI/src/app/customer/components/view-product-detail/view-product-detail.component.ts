import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrl: './view-product-detail.component.scss'
})
export class ViewProductDetailComponent implements OnInit {

  productId: number;
  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];
  showZoom = false;
  copied = false;

  constructor(private messageService: MessageService,
    private customerService: CustomerService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.activatedRouter.snapshot.params['productId'];
    this.getProductDetailsById();
  }

  getProductDetailsById() {
    this.customerService.getProductDetailById(this.productId).subscribe(res => {
      if (res.productDto) {
        this.product = res.productDto;
        if (this.product.byteImg) {
          this.product.processedImg = 'data:image/png;base64,' + this.product.byteImg;
        }
        this.FAQS = res.faqDtoList || [];
        (res.reviewDtoList || []).forEach((element: any) => {
          if (element.returnedImg) {
            element.processedImg = 'data:image/png;base64,' + element.returnedImg;
          }
          this.reviews.push(element);
        });
        this.trackRecentlyViewed();
      }
    });
  }

  private trackRecentlyViewed() {
    try {
      const key = 'sk_recently_viewed';
      const raw = localStorage.getItem(key);
      let list: any[] = raw ? JSON.parse(raw) : [];
      list = list.filter(p => p.id !== this.product.id);
      list.unshift({ id: this.product.id, name: this.product.name, price: this.product.price, processedImg: this.product.processedImg });
      localStorage.setItem(key, JSON.stringify(list.slice(0, 10)));
    } catch {}
  }

  addToCart() {
    this.customerService.addToCart(this.productId).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Product added to cart!', life: 3000 }),
      error: () => this.messageService.add({ severity: 'warn', summary: 'Already in Cart', detail: 'This product is already in your cart.', life: 3000 })
    });
  }

  addToWishlist() {
    const wishListDto = { productId: this.productId, userId: UserStorageService.getUserId() };
    this.customerService.addProductToWishlist(wishListDto).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Wishlisted', detail: 'Product added to wishlist!', life: 5000 }),
      error: (error: any) => {
        const detail = error.status === 409 ? 'Already in wishlist' : 'Something went wrong';
        this.messageService.add({ severity: 'warn', summary: 'Note', detail, life: 5000 });
      }
    });
  }

  shareLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.copied = true;
      this.messageService.add({ severity: 'success', summary: 'Copied!', detail: 'Product link copied to clipboard.', life: 3000 });
      setTimeout(() => { this.copied = false; }, 2500);
    });
  }
}
