import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrl: './view-product-detail.component.scss'
})
export class ViewProductDetailComponent {

  productId: number;
  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];

  constructor(private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private activatedRouter:ActivatedRoute
  ){}

  ngOnInit(){
    this.productId = this.activatedRouter.snapshot.params['productId'];
    this.getProductDetailsById();
  }


  getProductDetailsById() {
    this.customerService.getProductDetailById(this.productId).subscribe(res => {
      if (res.productDto) {
        this.product = res.productDto;
        if (this.product.byteImg) {
          this.product.processedImg = 'data:image/png;base64,' + this.product.byteImg;
        } else {
          console.error('byteImg is undefined or null');
        }
        this.FAQS = res.faqDtoList || [];
        (res.reviewDtoList || []).forEach(element => {
          if (element.returnedImg) {
            element.processedImg = 'data:image/png;base64,' + element.returnedImg;
          }
          this.reviews.push(element);
        });
      } else {
        console.error('productDto is undefined or null');
      }
    }, error => {
      console.error('Error fetching product details:', error);
    });
  }

  addToWishlist(){
    const wishListDto = {
      productId: this.productId,
      userId: UserStorageService.getUserId()
    };
    
    this.customerService.addProductToWishlist(wishListDto).subscribe(
      res => {
        this.snackBar.open("Product added to wishlist successfully", 'Close', {
          duration: 5000
        });
      },
      error => {
        if (error.status === 409) { // Conflict: Product already in wishlist
          this.snackBar.open(error.error || "Product already in wishlist", 'ERROR', {
            duration: 5000
          });
        } else if (error.status === 400) { // Bad request
          this.snackBar.open("Invalid product or user", 'ERROR', {
            duration: 5000
          });
        } else {
          this.snackBar.open("Something went wrong", 'ERROR', {
            duration: 5000
          });
        }
      }
    );
  }
}
