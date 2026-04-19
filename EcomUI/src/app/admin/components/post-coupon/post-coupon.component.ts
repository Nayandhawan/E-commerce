import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent {

  couponForm: FormGroup

  constructor(private fb:FormBuilder,
    private router:Router,
    private messageService: MessageService,
    private adminService: AdminService
  ){}

  ngOnInit():void {
    this.couponForm = this.fb.group({
      name : [null,[Validators.required]],
      code : [null,[Validators.required]],
      discount : [null,[Validators.required, Validators.min(1), Validators.max(100)]],
      expirationDate : [null,[Validators.required]]
    })
  }

  addCoupon(){
    if(this.couponForm.valid){
      const payload = { ...this.couponForm.value, discount: Number(this.couponForm.value.discount) };
      this.adminService.addCoupon(payload).subscribe(res =>{
        if(res.id != null){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Coupon Posted SuccessFully', life: 5000 });
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 5000 });
        }
      })
    }else{
      this.couponForm.markAllAsTouched();
    }
  }

}
