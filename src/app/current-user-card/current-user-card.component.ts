import {Component, Input} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardHeader} from "@angular/material/card";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'current-user-card',
  imports: [
    AsyncPipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardHeader,
    NgIf
  ],
  templateUrl: './current-user-card.component.html',
  styleUrl: './current-user-card.component.sass'
})
export class CurrentUserCardComponent {
  authState$: Observable<any>
  @Input()
  email!: string

  constructor(private authService: AuthService) {
    this.authState$ = this.authService.authState$
  }

  logout() {
    // TODO: perform this in an injection context, whatever that means (see error on console)
    this.authService.logout()
  }
}
