import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
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
      if (this.loginForm.valid) {
        this.isLoading = true;
        this.http.post("http://localhost:3000/api/login", this.loginForm.value).subscribe(
          {
            next: (res: any) => {
              console.log('Login success');
              console.log(res);
              this.isLoading = false;
              this.router.navigateByUrl('/campaign-list');
            },
            error: (err: any) => {
              console.log(err);
              this.errorMessage = err.error.msg;
              console.log(err.error.msg);
              this.isLoading = false;
            },
            complete: () => {
              console.log("completed");
            }
          }
        );
      }

      // TODO Storing the user's authentication token in local storage:
      // TODO localStorage.setItem('token', 'token_here');
    }
  }
}