import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
  imagePreview: string | ArrayBuffer | null;
  productId: number;
  existingImage: string | null = null;
  imgChanged = false;

  variants: any[] = [];
  variantSize = '';
  variantColour = '';
  variantStock = 0;
  addingVariant = false;

  galleryImages: any[] = [];
  galleryFile: File | null = null;
  uploadingGallery = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => { this.imagePreview = reader.result; };
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['productId'];
    this.productForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
    });
    this.getAllCategories();
    this.getProductById();
    this.loadVariants();
    this.loadGallery();
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe(res => { this.listofCategories = res; });
  }

  getProductById() {
    this.adminService.getProductById(this.productId).subscribe(res => {
      this.productForm.patchValue(res);
      this.existingImage = res.imgUrl || (res.byteImg ? 'data:image/jpeg;base64,' + res.byteImg : null);
    });
  }

  loadVariants() {
    this.adminService.getVariants(this.productId).subscribe(res => { this.variants = res; });
  }

  variantLabel(v: any): string {
    if (v.size && v.colour) return `${v.size} / ${v.colour}`;
    return v.size || v.colour || '';
  }

  addVariant() {
    if (!this.variantSize && !this.variantColour) {
      this.messageService.add({ severity: 'warn', summary: 'Required', detail: 'Enter at least a size or colour.', life: 3000 });
      return;
    }
    this.addingVariant = true;
    this.adminService.addVariant(this.productId, {
      size: this.variantSize || undefined,
      colour: this.variantColour || undefined,
      stockQuantity: this.variantStock
    }).subscribe({
      next: (v) => {
        this.variants.push(v);
        this.variantSize = '';
        this.variantColour = '';
        this.variantStock = 0;
        this.addingVariant = false;
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Variant added.', life: 2000 });
      },
      error: () => { this.addingVariant = false; }
    });
  }

  deleteVariant(variantId: number) {
    this.adminService.deleteVariant(variantId).subscribe(() => {
      this.variants = this.variants.filter(v => v.id !== variantId);
      this.messageService.add({ severity: 'info', summary: 'Removed', detail: 'Variant removed.', life: 2000 });
    });
  }

  loadGallery() {
    this.adminService.getProductImages(this.productId).subscribe({
      next: (imgs) => { this.galleryImages = imgs; },
      error: () => {}
    });
  }

  onGalleryFileSelected(event: any) {
    this.galleryFile = event.target.files[0];
  }

  uploadGalleryImage() {
    if (!this.galleryFile) return;
    this.uploadingGallery = true;
    const fd = new FormData();
    fd.append('file', this.galleryFile);
    this.adminService.addProductImage(this.productId, fd).subscribe({
      next: (imgs) => {
        this.galleryImages = imgs;
        this.galleryFile = null;
        this.uploadingGallery = false;
        this.messageService.add({ severity: 'success', summary: 'Uploaded', detail: 'Image added to gallery.', life: 3000 });
      },
      error: () => { this.uploadingGallery = false; }
    });
  }

  deleteGalleryImage(imageId: number) {
    this.adminService.deleteProductImage(this.productId, imageId).subscribe({
      next: () => {
        this.galleryImages = this.galleryImages.filter(img => img.id !== imageId);
        this.messageService.add({ severity: 'info', summary: 'Removed', detail: 'Gallery image removed.', life: 2000 });
      }
    });
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      const formData: FormData = new FormData();
      if (this.imgChanged && this.selectedFile) formData.append('img', this.selectedFile);
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this.adminService.updateProduct(this.productId, formData).subscribe((res) => {
        if (res != null) {
          this.existingImage = res.imgUrl || (res.byteImg ? 'data:image/jpeg;base64,' + res.byteImg : this.existingImage);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully', life: 5000 });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res?.message || 'Failed to update product', life: 5000 });
        }
      });
    } else {
      for (const i in this.productForm.controls) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
