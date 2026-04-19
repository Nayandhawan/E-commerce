import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signupForm!: FormGroup ;
  hidePassword = true;

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router){
    }

  ngOnInit():void {
    this.signupForm = this.fb.group({
      name :           [null, [Validators.required, Validators.minLength(2)]],
      email :          [null, [Validators.required, Validators.email]],
      password :       [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword :[null, [Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if( password != confirmPassword){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password do not match.', life: 5000 });
      return;
    }
  
  this.authService.register(this.signupForm.value).subscribe({
    next: (response) => {
      this.router.navigateByUrl('/login');
    },
    error: (error) => {
      const detail = error.status === 409
        ? 'An account with this email already exists.'
        : 'Signup failed. Please try again later.';
      this.messageService.add({ severity: 'error', summary: 'Error', detail, life: 5000 });
    }
  });
  }
}
