import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly router: Router = inject(Router);
  isloading: boolean = false;
  errorMassage: string = '';

  loginForm: FormGroup = this.formBuilder.group({
    'email': [null, [Validators.required, Validators.email]],
    'password': [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  });

  loginFormSubmit() {

    if (this.loginForm.valid) {
      this.isloading = true;
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success == true) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            this.router.navigate(['/feed']);
          } this.isloading = false;

        },
        error: (err) => {
          this.errorMassage = err.error.message;
          this.isloading = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
  }

}
