import { Component, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent {

  orders: any;
  displayedColumns: string[] = ['trackingId', 'userName', 'amount', 'description', 'address', 'date', 'status', 'action'];

  constructor(
    private adminService: AdminService,
    private messageService: MessageService
  ){}

  ngOnInit(){
    this.getPlacedOrders();
  }

  getPlacedOrders(){
    this.adminService.getPlacedOrders().subscribe(res =>{
      this.orders = res;
    })
  }

  changeOrderStatus(orderId: number, status: string){
    this.adminService.changeOrderStatus(orderId,status).subscribe(res =>{
      if(res.id !=null){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Order status changed successfully", life: 5000 });
        this.getPlacedOrders();
      }
      else{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Something went wrong", life: 5000 });
      }
    })
  }
}
