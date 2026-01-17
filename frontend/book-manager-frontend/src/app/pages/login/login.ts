import { Component, computed, inject, Signal, signal } from '@angular/core';
import { CField } from "../../components/c-field/c-field";
import { CButton } from "../../components/c-button/c-button";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { LoginRequest } from '../../core/models/auth/login-request.dto';
import { RegisterRequest } from '../../core/models/auth/register-request.dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export type AuthType = 'login' | 'register';


@Component({
  selector: 'app-login',
  imports: [CField, CButton, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  private _authService = inject(Auth);
  private _router = inject(Router);
  private _toastr = inject(ToastrService);

  isLoading = signal(false);

  authType = signal<AuthType>('login');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  title = computed(() => this.authType() === 'login' ? 'Acesse a plataforma' : 'Crie sua conta');
  buttonLabel = computed(() => this.authType() === 'login' ? 'Entrar' : 'Registrar');


  handleAuthClick() {
    if (this.authType() === 'login') {
      this._login();
    } else {
      this._register();
    }
  }

  private _login() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const request: LoginRequest = {
        email: this.loginForm.value.email!!,
        password: this.loginForm.value.password!!
      }
      this._authService.login(request).subscribe({
        next: (response) => {
          console.log("SUCESSO");
          this._toastr.success('Login realizado com sucesso!', 'Bem-vindo!');
          this._authService.saveToken(response.token);
          this._router.navigate(['/home']);
        },
        error: (error) => {
          console.log("ERRO")
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    } else {
      console.log('Formulário inválido. Verifique os campos.');
      this.loginForm.markAllAsTouched();
    }
  }

  private _register() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const request: RegisterRequest = {
        email: this.loginForm.value.email!!,
        password: this.loginForm.value.password!!
      }
      this._authService.register(request).subscribe({
        next: (response) => {
          this._toastr.success('Registro realizado com sucesso!', 'Sucesso');
          this._authService.saveToken(response.token);
          this.switchAuthType();
          this.loginForm.reset();
        },
        error: (error) => {
          console.log("ERRO NO REGISTRO");
        },
        complete: () => {
          this.isLoading.set(false);
        }

      });
    } else {
      console.log('Formulário inválido. Verifique os campos.');
      this.loginForm.markAllAsTouched();
    }
  }

  switchAuthType() {
    const currentType = this.authType();
    const currentValues = this.loginForm.value;
    this.authType.set(currentType === 'login' ? 'register' : 'login');
    this.loginForm.reset(currentValues);
  }

}
