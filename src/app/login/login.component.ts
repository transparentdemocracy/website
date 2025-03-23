import {Component} from '@angular/core'
import {AuthService} from '../auth.service'
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AsyncPipe, CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {CurrentUserCardComponent} from "../current-user-card/current-user-card.component";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";

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
    MatCardFooter,
    CurrentUserCardComponent,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  authState$!: Observable<any>
  userInput!: string
  passwordInput!: string

  constructor(private authService: AuthService, private router: Router) {
    this.authState$ = this.authService.authState$
  }

  login() {
    this.authService.login(this.userInput, this.passwordInput).then(
      u => {
        this.router.navigate(['/']);
      },
      bad => {
        // TODO: handle sign in error
      })
    this.userInput = '';
    this.passwordInput = '';
  }

}
