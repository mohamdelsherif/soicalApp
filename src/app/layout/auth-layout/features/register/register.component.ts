import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  isloading: boolean = false;
  errorMassage: string = '';

  registerForm = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    'username': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'dateOfBirth': new FormControl(null, [Validators.required]),
    'gender': new FormControl('Select your gender', [Validators.required]),
    'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    'rePassword': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  }, this.checkSamePassword);

  registerFormSubmit() {
    if (this.registerForm.valid) {
      this.isloading = true;
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success == true) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            this.router.navigate(['/login']);
          } this.isloading = false;

        },
        error: (err) => {
          this.errorMassage = err.error.message;
          this.isloading = false;
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  checkSamePassword(fg: AbstractControl) {
    const password = fg.get('password')?.value;
    const rePassword = fg.get('rePassword')?.value;
    if (password !== rePassword) {
      fg.get('rePassword')?.setErrors({ misMatch: true });
      return { misMatch: true };
    }
    return null;
  }

  togglePasswordVisibility(inputElement: HTMLInputElement) {
    if (inputElement.getAttribute('type') === 'password') {
      inputElement.setAttribute('type', 'text');

    }
    else {
      inputElement.setAttribute('type', 'password');
    }
  }
}
