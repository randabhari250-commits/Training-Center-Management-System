import { Component , signal } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Service/AuthService';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private AuthService = inject(AuthService);
  private Router = inject(Router);
  private fb = inject(FormBuilder);

  SuccessMessage = signal('');
  errorMessage = signal('');

  loginForm: FormGroup = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  SubmitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.SuccessMessage.set('');
    this.errorMessage.set('');

    this.AuthService.Login(this.loginForm.value).subscribe({
      next: () => { this.SuccessMessage.set('Login successful. Redirecting...');
        setTimeout(() => {
          this.Router.navigate(['/students']);}, 1000);
      },
      error: (error) => {
        console.error('Error logging in', error);

        if (error.status === 401) {
          this.errorMessage.set('Invalid email or password.');
        } else {
          this.errorMessage.set('Error logging in. Please try again.');
        }
      }
    });
  }
}
