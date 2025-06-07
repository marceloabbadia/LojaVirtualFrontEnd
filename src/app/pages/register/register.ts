import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  
  errorMessage: string | null = null;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      cp4: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      cp3: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      cplocal: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      passwordConfirm: ['', Validators.required],
      confirm: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const form = this.registerForm.value;

      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        address: form.address,
        cp4: form.cp4,
        cp3: form.cp3,
        cplocal: form.cplocal,
        country: form.country,
      };

      this.registerService.register(userData).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/']);
        },

        error: (err) => {
          console.error('Erro ao cadastrar:', err);
          this.errorMessage =
            err?.error?.message || 'Erro inesperado ao cadastrar.';
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  hasError(field: string, error: string): boolean {
    const control = this.registerForm.get(field);
    return !!control?.touched && !!control?.hasError(error);
  }
}
