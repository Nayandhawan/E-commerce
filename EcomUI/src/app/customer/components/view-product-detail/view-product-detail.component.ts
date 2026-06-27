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
  variants: any[] = [];
  relatedProducts: any[] = [];
  selectedVariant: any = null;
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
        this.product.processedImg = this.product.imgUrl ||
          (this.product.byteImg ? 'data:image/png;base64,' + this.product.byteImg : null);
        this.FAQS = res.faqDtoList || [];
        this.variants = (res.variantList || []).map((v: any) => ({
          ...v,
          label: v.size && v.colour ? `${v.size} / ${v.colour}` : (v.size || v.colour || '')
        }));
        (res.reviewDtoList || []).forEach((element: any) => {
          element.processedImg = element.imgUrl ||
            (element.returnedImg ? 'data:image/png;base64,' + element.returnedImg : null);
          this.reviews.push(element);
        });
        this.trackRecentlyViewed();
        if (this.product.categoryName) {
          this.customerService.getRelatedProducts(this.productId, this.product.categoryName).subscribe(items => {
            this.relatedProducts = items.map((p: any) => ({
              ...p,
              processedImg: p.imgUrl || (p.byteImg ? 'data:image/jpeg;base64,' + p.byteImg : null)
            }));
          });
        }
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
    if (this.variants.length > 0 && !this.selectedVariant) {
      this.messageService.add({ severity: 'warn', summary: 'Select a variant', detail: 'Please choose a size or colour first.', life: 3000 });
      return;
    }
    this.customerService.addToCart(this.productId).subscribe({
      next: () => this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Product added to cart!', life: 3000 }),
      error: (err: any) => {
        if (err.status === 409) {
          this.messageService.add({ severity: 'warn', summary: 'Already in Cart', detail: 'This product is already in your cart.', life: 3000 });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not add to cart. Please try again.', life: 3000 });
        }
      }
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
    const url = window.location.href;
    const doCopy = () => {
      this.copied = true;
      this.messageService.add({ severity: 'success', summary: 'Copied!', detail: 'Product link copied to clipboard.', life: 3000 });
      setTimeout(() => { this.copied = false; }, 2500);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(doCopy).catch(() => {
        this.fallbackCopy(url);
        doCopy();
      });
    } else {
      this.fallbackCopy(url);
      doCopy();
    }
  }

  private fallbackCopy(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
