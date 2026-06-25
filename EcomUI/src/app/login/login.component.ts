import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from '../store/auth/auth.actions';
import { selectAuthError, selectAuthLoading } from '../store/auth/auth.selectors';
import { AuthService } from '../services/auth/auth.service';

type FpStep = 'email' | 'otp' | 'password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  showFpDialog = false;
  fpStep: FpStep = 'email';
  fpEmail = '';
  fpOtp = '';
  fpNewPassword = '';
  fpConfirmPassword = '';
  fpLoading = false;
  fpHideNew = true;
  fpHideConfirm = true;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store: Store,
    private authService: AuthService
  ) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    this.error$.subscribe(error => {
      if (error) {
        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: error, life: 5000 });
      }
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.store.dispatch(login({ username, password }));
  }

  openForgotPassword() {
    this.fpStep = 'email';
    this.fpEmail = '';
    this.fpOtp = '';
    this.fpNewPassword = '';
    this.fpConfirmPassword = '';
    this.showFpDialog = true;
  }

  sendOtp() {
    if (!this.fpEmail.trim()) return;
    this.fpLoading = true;
    this.authService.forgotPassword(this.fpEmail.trim()).subscribe({
      next: () => {
        this.fpLoading = false;
        this.fpStep = 'otp';
        this.messageService.add({ severity: 'info', summary: 'OTP Sent', detail: `A 6-digit OTP was sent to ${this.fpEmail}`, life: 6000 });
      },
      error: () => {
        this.fpLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not send OTP. Please try again.', life: 4000 });
      }
    });
  }

  verifyOtp() {
    if (this.fpOtp.length !== 6) return;
    this.fpLoading = true;
    this.authService.verifyOtp(this.fpEmail, this.fpOtp).subscribe({
      next: () => {
        this.fpLoading = false;
        this.fpStep = 'password';
      },
      error: () => {
        this.fpLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Invalid OTP', detail: 'The OTP is incorrect or has expired.', life: 4000 });
      }
    });
  }

  resetPassword() {
    if (!this.fpNewPassword || this.fpNewPassword !== this.fpConfirmPassword) return;
    if (this.fpNewPassword.length < 6) {
      this.messageService.add({ severity: 'warn', summary: 'Weak Password', detail: 'Password must be at least 6 characters.', life: 3000 });
      return;
    }
    this.fpLoading = true;
    this.authService.resetPassword(this.fpEmail, this.fpOtp, this.fpNewPassword).subscribe({
      next: () => {
        this.fpLoading = false;
        this.showFpDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Password Reset', detail: 'Your password has been reset. Please login.', life: 5000 });
      },
      error: () => {
        this.fpLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not reset password. OTP may have expired.', life: 4000 });
      }
    });
  }
}
