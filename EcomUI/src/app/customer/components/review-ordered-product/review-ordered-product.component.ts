import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-review-ordered-product',
  templateUrl: './review-ordered-product.component.html',
  styleUrl: './review-ordered-product.component.scss'
})
export class ReviewOrderedProductComponent {

  productId: number;
  reviewForm: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService:CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.productId = this.activatedRoute.snapshot.params['productId'];
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required]],
      description: [null, [Validators.required]],

    })
  }

  onfileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload =() =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm(){
    const formdata: FormData = new FormData();
    formdata.append('img',this.selectedFile);
    formdata.append('productId',this.productId.toString());
    formdata.append('userId',UserStorageService.getUserId().toString());
    formdata.append('rating',this.reviewForm.get('rating').value);
    formdata.append('description', this.reviewForm.get('description').value);

    this.customerService.giveReview(formdata).subscribe(res =>{
      if(res != null){
        this.snackBar.open('Review Posted Successfully','Close',{
          duration: 5000
        });
        this.router.navigateByUrl('/customer/my_orders');
      }else{
        this.snackBar.open('Something went wrong','Close',{
          duration: 5000
        });
      }
    })
  }

}
