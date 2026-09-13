import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Service/AuthService';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private AuthService = inject(AuthService);
  private Router = inject(Router);
  private FormBuilder = inject(FormBuilder);

  SuccessMessage = signal('');
  errorMessage = signal('');

  registerForm: FormGroup = this.FormBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submitRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.SuccessMessage.set('');
    this.errorMessage.set('');

    this.AuthService.Register(this.registerForm.value).subscribe({
      next: () => {
        this.SuccessMessage.set('Registration successful. Redirecting to login...');

        setTimeout(() => {
          this.Router.navigate(['/login']);}, 1000);
      },
      error: (error) => {console.error('Error registering user', error);

        if (error.status === 400) {
          this.errorMessage.set('This email is already registered.');
        } else {
          this.errorMessage.set('Error registering. Please try again.');
        }
      }
    });
  }
}
