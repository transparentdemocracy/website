import {Component} from '@angular/core'
import {AuthService} from '../auth.service'
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AsyncPipe, CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'login',
  imports: [
    MatCardHeader,
    MatCard,
    MatFormField,
    MatButton,
    CommonModule,
    MatCardContent,
    MatInputModule,
    AsyncPipe,
    FormsModule,
    MatCardActions
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  authState$!: Observable<any>
  userInput!: string
  passwordInput!: string

  constructor(private authService: AuthService) {
    this.authState$ = this.authService.authState$
  }

  login() {
    this.authService.login(this.userInput, this.passwordInput)
    this.userInput = '';
    this.passwordInput = '';
  }

  logout() {
    this.authService.logout()
  }

}
