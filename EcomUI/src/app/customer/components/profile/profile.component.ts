import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';

type Section = 'personal' | 'address' | 'card';

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
  cardForm!: FormGroup;

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

    this.cardForm = this.fb.group({
      cardHolderName: [''],
      cardNumber:     [''],
      cardExpiry:     [''],
      cardType:       [''],
      cardCvv:        [''],
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
        this.cardForm.patchValue({ cardHolderName: data.cardHolderName, cardNumber: data.cardNumber, cardExpiry: data.cardExpiry, cardType: data.cardType, cardCvv: data.cardCvv });
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load profile' })
    });
  }

  selectSection(section: Section): void {
    this.activeSection = section;
  }

  togglePersonalEdit(): void {
    if (this.isEditingPersonal) {
      // Cancel — revert values and disable
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

  get maskedCard(): string {
    const num = this.profile?.cardNumber;
    if (!num || num.length < 4) return num || '';
    return '**** **** **** ' + num.slice(-4);
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
    } else if (this.activeSection === 'address') {
      payload = this.addressForm.value;
    } else {
      payload = this.cardForm.value;
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
