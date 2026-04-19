import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PostCategoryComponent {

  categories: any[] = [];
  categoryForm: FormGroup;
  editingCategory: any = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name:        [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
    this.getCategories();
  }

  getCategories() {
    this.adminService.getAllCategories().subscribe(res => {
      this.categories = Array.isArray(res) ? res : (res ? [res] : []);
    });
  }

  submitForm() {
    if (this.editingCategory) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  addCategory() {
    if (this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe(res => {
        if (res.id != null) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category added successfully', life: 4000 });
          this.categoryForm.reset();
          this.getCategories();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 4000 });
        }
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  editCategory(category: any) {
    this.editingCategory = category;
    this.categoryForm.patchValue({
      name:        category.name,
      description: category.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.editingCategory = null;
    this.categoryForm.reset();
  }

  deleteCategory(category: any) {
    this.adminService.deleteCategory(category.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Category deleted successfully', life: 4000 });
        if (this.editingCategory?.id === category.id) this.cancelEdit();
        this.getCategories();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete category', life: 4000 })
    });
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      this.adminService.updateCategory(this.editingCategory.id, this.categoryForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Category updated successfully', life: 4000 });
          this.editingCategory = null;
          this.categoryForm.reset();
          this.getCategories();
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update category', life: 4000 })
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
