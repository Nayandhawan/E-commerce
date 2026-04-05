import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrl: './view-ordered-products.component.scss'
})
export class ViewOrderedProductsComponent implements OnInit {

  orderId: any;
  orderedProductDetailsList: any[] = [];
  totalAmount: any;

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService) {}

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params['orderId'];
    this.getOrderedProductsDetailsByOrderId();
  }

  getOrderedProductsDetailsByOrderId() {
    this.customerService.getOrderedProducts(this.orderId).subscribe(res => {
      this.totalAmount = res.amount;
      this.orderedProductDetailsList = (res.cartItems ?? []).map((item: any) => ({
        ...item,
        name: item.productName,
        processedImg: null   // CartItemsDto has no image; shown as placeholder
      }));
    });
  }
}
