import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { baseUrl } from '../../constants/baseUrl';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  // formObject
  registerForm: FormGroup;

  // isLoading state and errorMessage
  isLoading: boolean = false;
  errorMessage: string = '';

  // constructor
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // methods

  // Checking control valid
  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.registerForm.get(controlName);
    return control?.invalid && control?.touched;
  }
  // Simple validation message
  getValidationMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);

    if (control?.hasError('required') && control.touched) {
      return `Invalid ${controlName}!`;
    }
    // else if (control?.hasError('pattern') && control.touched) {
    //   return 'Invalid pattern!';
    // } I don't need this right now but I save it anyway...
    return '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.http.post(`${baseUrl}/register`, this.registerForm.value).subscribe(
        {
          next: (res: any) => {
            console.log('Register success');
            console.log(res);
            this.isLoading = false;
            this.router.navigateByUrl('/login');
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
  }
}
