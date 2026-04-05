import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrl: './view-wishlist.component.scss'
})
export class ViewWishlistComponent implements OnInit {

  products: any[] = [];

  constructor(private customerService: CustomerService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.customerService.getWishlistByUserId().subscribe(res => {
      this.products = res.map((item: any) => ({
        ...item,
        processedImg: item.byteImg ? 'data:image/jpeg;base64,' + item.byteImg : null
      }));
    });
  }

  removeFromWishlist(productId: number) {
    this.customerService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.productId !== productId);
        this.snackBar.open('Removed from wishlist', 'Close', { duration: 2000 });
      },
      error: () => this.snackBar.open('Could not remove item', 'Close', { duration: 2000 })
    });
  }

  moveToCart(productId: number) {
    this.customerService.addToCart(productId).subscribe({
      next: () => this.snackBar.open('Added to cart!', 'Close', { duration: 2000 }),
      error: () => this.snackBar.open('Could not add to cart', 'Close', { duration: 2000 })
    });
  }
}
