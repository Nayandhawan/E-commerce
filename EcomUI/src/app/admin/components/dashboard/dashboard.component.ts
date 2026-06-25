import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm! : FormGroup;

  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ){}

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null,[Validators.required]]
    })
  }

  getAllProducts(){
    this.products = [];
    this.adminService.getAllProducts().subscribe(res=>{
      res.forEach(element => {
        element.processedImg = element.imgUrl || (element.byteImg ? 'data:image/jpeg;base64,' + element.byteImg : null);
        this.products.push(element);
      });
    });
  }
  submitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title').value;
    this.adminService.getAllProductsByName(title).subscribe(res=>{
      res.forEach(element => {
        element.processedImg = element.imgUrl || (element.byteImg ? 'data:image/jpeg;base64,' + element.byteImg : null);
        this.products.push(element);
      });
    });
  }

  deleteProduct(productId){
    this.adminService.deleteProduct(productId).subscribe(res =>{
      if(res == null){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Deleted SuccessFully', life: 5000 });
        this.getAllProducts();
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 5000 });
      }
    })
  }

}
