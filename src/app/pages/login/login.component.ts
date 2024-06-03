import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { baseUrl } from '../../constants/baseUrl';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  // formObject
  loginForm: FormGroup;

  // isLoading state and errorMessage
  isLoading: boolean = false;
  errorMessage: string = '';

  // constructor
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // methods

  // Checking control valid
  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return control?.invalid && control?.touched;
  }
  // Simple validation message
  getValidationMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (control?.hasError('required') && control.touched) {
      return `Invalid ${controlName}!`;
    }
    // else if (control?.hasError('pattern') && control.touched) {
    //   return 'Invalid pattern!';
    // } I don't need this right now but I save it anyway...
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.http.post(`${baseUrl}/login`, this.loginForm.value).
        subscribe(
          {
            next: (res: any) => {
              this.isLoading = false;
              this.authService.setAuthToken(res.token, res.data.username);
              this.router.navigateByUrl('/campaign-list');
            },
            error: (err: any) => {
              this.errorMessage = err.error.msg;
              this.isLoading = false;

            },
            complete: () => {
              console.log("completed");
            }
          }
        );
    }
  }
}