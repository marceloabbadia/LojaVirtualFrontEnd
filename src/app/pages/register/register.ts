import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      cp4: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      cp3: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      cpLocal: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        '',
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ],
      passwordConfirm: ['', Validators.required],
      confirm: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  hasError(field: string, error: string) {
    return (
      this.registerForm.get(field)?.touched &&
      this.registerForm.get(field)?.hasError(error)
    );
  }
}
