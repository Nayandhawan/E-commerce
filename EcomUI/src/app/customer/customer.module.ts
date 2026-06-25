import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../PrimeNGModule';
import { MessageService } from 'primeng/api';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ViewOrderedProductsComponent } from './components/view-ordered-products/view-ordered-products.component';
import { ReviewOrderedProductComponent } from './components/review-ordered-product/review-ordered-product.component';
import { ViewProductDetailComponent } from './components/view-product-detail/view-product-detail.component';
import { ViewWishlistComponent } from './components/view-wishlist/view-wishlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CompareComponent } from './components/compare/compare.component';
import { cartReducer } from '../store/cart/cart.reducer';
import { wishlistReducer } from '../store/wishlist/wishlist.reducer';
import { CartEffects } from '../store/cart/cart.effects';
import { WishlistEffects } from '../store/wishlist/wishlist.effects';


@NgModule({
  declarations: [
    CustomerComponent,
    DashboardComponent,
    CartComponent,
    PlaceOrderComponent,
    MyOrdersComponent,
    ViewOrderedProductsComponent,
    ReviewOrderedProductComponent,
    ViewProductDetailComponent,
    ViewWishlistComponent,
    ProfileComponent,
    CompareComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    HttpClientModule,
    StoreModule.forFeature('cart', cartReducer),
    StoreModule.forFeature('wishlist', wishlistReducer),
    EffectsModule.forFeature([CartEffects, WishlistEffects])
  ],
  providers: [MessageService]
})
export class CustomerModule { }
