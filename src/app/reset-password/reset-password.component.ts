import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'reset-password',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.sass'
})
export class ResetPasswordComponent {

  form: FormGroup
  confirmed = false

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = fb.group({
      username: ['', [Validators.required, Validators.email]]
    })
  }

  resetPassword(){
    this.authService.resetPassword(this.form.get('username')!!.value).then (
      () => this.confirm(),
      () => this.confirm()
    )
  }

  confirm() {
    this.confirmed = true
  }
}
