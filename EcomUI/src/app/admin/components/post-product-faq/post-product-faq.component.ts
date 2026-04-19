import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrl: './post-product-faq.component.scss'
})
export class PostProductFaqComponent {

  productId: number;
  FAQForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ){}
  
  ngOnInit(){

    this.productId = this.activatedRoute.snapshot.params['productId'];
    this.FAQForm = this.fb.group({
      question: [null,[Validators.required]],
      answer: [null,[Validators.required]],
    })
  }

  postFAQ( ){
    console.log(JSON.stringify("Product ID :"+this.productId));
    console.log("FAQ FORM :" + this.FAQForm.value);
    this.adminService.postFAQ(this.productId, this.FAQForm.value).subscribe(res =>{
      if(res.id !=null){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "FAQ Posted SuccessFully", life: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      }else{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Something went wrong", life: 5000 });
      }
    })
  }

}
