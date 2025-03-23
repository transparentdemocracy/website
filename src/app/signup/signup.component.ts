import {Component} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, NgIf} from "@angular/common";
import {CurrentUserCardComponent} from "../current-user-card/current-user-card.component";
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'signup',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatLabel,
    FormsModule,
    MatFormFieldModule,
    MatCardFooter,
    MatInput,
    MatButton,
    AsyncPipe,
    CurrentUserCardComponent,
    NgIf,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass'
})
export class SignupComponent {

  authState$: Observable<any>

  signupForm: FormGroup
  lastError = ''

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private translateService: TranslateService) {
    this.authState$ = authService.authState$

    this.signupForm = fb.group({
      'username': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'password2': ['', [Validators.required, Validators.minLength(8)]],
    })

    this.signupForm.get('password2')?.setValidators([
      Validators.required,
      this.passwordsMatch.bind(this)
    ]);

    this.signupForm.get('password')?.valueChanges.subscribe(() => {
      this.signupForm.get('password2')?.updateValueAndValidity();
    });
  }

  // Custom validator function
  passwordsMatch(control: any) {
    const passwordValue = this.signupForm.get('password')?.value;
    return control.value === passwordValue ? null : {passwordsDoNotMatch: true};
  }

  signUp() {
    const me = this
    let formValue = this.signupForm.value;
    const username = formValue.username
    const password = formValue.password
    this.authService.createUserWithEmailAndPassword(username, password).then(
      (_) => this.router.navigate(['/login']),
      function (err: any) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            me.setTranslatedError('auth.signUpEmailAlreadyInUse')
            break;
          case 'auth/invalid-email':
            me.setTranslatedError('auth.signUpEmailAlreadyInUse')
            break;
          case'auth/operation-not-allowed':
            me.setTranslatedError('auth.signUpGeneralError')
            break;
          case 'auth/weak-password':
            me.setTranslatedError('auth.signUpWeakPassword')
            break;
          case 'auth/missing-password':
            // There's no point having an error message for this, it should be prevented by the form
            me.setTranslatedError('auth.signUpGeneralError')
            break;
          default:
            me.setTranslatedError('auth.signUpGeneralError')
        }
      }
    )
    this.lastError = '';
  }

  setTranslatedError(key: string) {
    this.translateService.get(key).subscribe(
      (value: string) => this.lastError = value
    )
  }
}
