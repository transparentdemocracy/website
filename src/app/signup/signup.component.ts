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
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass'
})
export class SignupComponent {

  authState$: Observable<any>

  signupForm: FormGroup
  lastError = ''

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
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
            me.lastError = "This email is already in use";
            break;
          case 'auth/invalid-email':
            me.lastError = 'That is not a valid email address or it is already in use.';
            break;
          case'auth/operation-not-allowed':
            me.lastError = "Sorry, this isn't working. Please try again later.";
            break;
          case 'auth/weak-password':
            me.lastError = 'The password you provided is too weak. It must have at least 6 characters and include a special character.';
            break;
          case 'auth/missing-password':
            me.lastError = "It looks like you sent an empty password.";
            break;
          default:
            me.lastError = "Sorry, this isn't working. Please try again later.";
        }
      }
    )
    this.lastError = '';
  }
}
