import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {

  productForm: FormGroup;
  listofCategories: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer| null;
  productId: number;
  existingImage: string | null = null ;
  imgChanged = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
  ){}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit():void {
    this.productId = this.activatedRoute.snapshot.params['productId'];
    this.productForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
    });

    this.getAllCategories();
    this.getProductById();
  }
  
  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res=>{
      this.listofCategories = res;
    })
  }

  getProductById(){
    this.adminService.getProductById(this.productId).subscribe(res =>{
      this.productForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
    });
  }

  updateProduct():void {
    if(this.productForm.valid){
      const formData: FormData = new FormData();
      if(this.imgChanged && this.selectedFile){
        formData.append('img', this.selectedFile);
      }
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this.adminService.updateProduct(this.productId,formData).subscribe((res)=>{
        if(res!=null){
          console.log("Enter in IF",res);
          this.existingImage = res.byteImg ? 'data:image/jpeg;base64,' + res.byteImg : this.existingImage;
          this.snackBar.open("Product Updated SuccessFully",'Close',{
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        }
        this.snackBar.open(res.message, 'Close',{
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      })
    }
    else{
      for(const i in  this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }

}
