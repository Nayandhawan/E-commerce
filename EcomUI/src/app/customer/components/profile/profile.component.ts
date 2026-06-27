import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';

type Section = 'personal' | 'address' | 'saved-addresses';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  activeSection: Section = 'personal';
  isEditingPersonal = false;
  userId!: number;
  profile: any = {};

  personalForm!: FormGroup;
  addressForm!: FormGroup;
  newAddressForm!: FormGroup;

  savedAddresses: any[] = [];
  showAddAddressForm = false;
  savingAddress = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userId = Number(UserStorageService.getUserId());
    this.buildForms();
    this.loadProfile();
  }

  private buildForms(): void {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  [''],
      email:     ['', [Validators.required, Validators.email]],
      phone:     [''],
    });
    this.personalForm.disable();

    this.addressForm = this.fb.group({
      street:  [''],
      city:    [''],
      state:   [''],
      zipCode: [''],
      country: [''],
    });

    this.newAddressForm = this.fb.group({
      label:   ['Home'],
      street:  ['', Validators.required],
      city:    ['', Validators.required],
      state:   ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['India'],
      isDefault: [false],
    });
  }

  private loadProfile(): void {
    this.customerService.getUserProfile(this.userId).subscribe({
      next: (data: any) => {
        this.profile = data;
        const nameParts = (data.name || '').trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ');
        this.personalForm.patchValue({ firstName, lastName, email: data.email, phone: data.phone });
        this.addressForm.patchValue({ street: data.street, city: data.city, state: data.state, zipCode: data.zipCode, country: data.country });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load profile' })
    });
  }

  selectSection(section: Section): void {
    this.activeSection = section;
    if (section === 'saved-addresses') this.loadSavedAddresses();
  }

  loadSavedAddresses(): void {
    this.customerService.getSavedAddresses().subscribe({
      next: (data) => this.savedAddresses = data,
      error: () => {}
    });
  }

  addAddress(): void {
    if (this.newAddressForm.invalid) { this.newAddressForm.markAllAsTouched(); return; }
    this.savingAddress = true;
    this.customerService.addSavedAddress(this.newAddressForm.value).subscribe({
      next: () => {
        this.savingAddress = false;
        this.showAddAddressForm = false;
        this.newAddressForm.reset({ label: 'Home', country: 'India', isDefault: false });
        this.loadSavedAddresses();
        this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Address added' });
      },
      error: () => { this.savingAddress = false; }
    });
  }

  deleteAddress(addressId: number): void {
    this.customerService.deleteSavedAddress(addressId).subscribe({
      next: () => { this.loadSavedAddresses(); this.messageService.add({ severity: 'info', summary: 'Removed', detail: 'Address removed' }); },
      error: () => {}
    });
  }

  setDefaultAddress(addressId: number): void {
    this.customerService.setDefaultAddress(addressId).subscribe({
      next: () => { this.loadSavedAddresses(); this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Default address updated' }); },
      error: () => {}
    });
  }

  togglePersonalEdit(): void {
    if (this.isEditingPersonal) {
      const nameParts = (this.profile?.name || '').trim().split(' ');
      this.personalForm.patchValue({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' '),
        email: this.profile?.email,
        phone: this.profile?.phone,
      });
      this.personalForm.disable();
      this.isEditingPersonal = false;
    } else {
      this.personalForm.enable();
      this.isEditingPersonal = true;
    }
  }

  updateProfile(): void {
    let payload: any = {};

    if (this.activeSection === 'personal') {
      if (this.personalForm.invalid) {
        this.personalForm.markAllAsTouched();
        return;
      }
      const { firstName, lastName, email, phone } = this.personalForm.getRawValue();
      payload = { name: [firstName, lastName].filter(Boolean).join(' '), email, phone };
    } else {
      payload = this.addressForm.value;
    }

    this.customerService.updateUserProfile(this.userId, payload).subscribe({
      next: (data: any) => {
        this.profile = data;
        if (this.activeSection === 'personal') {
          this.personalForm.disable();
          this.isEditingPersonal = false;
        }
        this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Profile updated successfully' });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update profile' })
    });
  }
}
