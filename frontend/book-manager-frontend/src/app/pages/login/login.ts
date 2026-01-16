import { Component, inject, Signal, signal } from '@angular/core';
import { CField } from "../../components/c-field/c-field";
import { CButton } from "../../components/c-button/c-button";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

export type AuthType = 'login' | 'register';


@Component({
  selector: 'app-login',
  imports: [CField, CButton, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);

  authType = signal<AuthType>('login');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  handleAuthClick(){
    if(this.authType() === 'login'){
      this._onLoginClick();
    } else {
      //
    }
  }

  private _onLoginClick() {
    if (this.loginForm.valid) {
      console.log('Dados prontos para o Node.js:', this.loginForm.value);
    } else {
      console.log('Formulário inválido. Verifique os campos.');
      this.loginForm.markAllAsTouched(); 
    }
  }

  switchAuthType(){
    const currentType = this.authType();
    this.authType.set(currentType === 'login' ? 'register' : 'login');
  }


}
