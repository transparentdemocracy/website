import {inject, Injectable} from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
  deps: [AngularFireAuthModule]
})
export class AuthService {
  private auth = inject(Auth);
  authState$ = authState(this.auth);

  constructor(private router: Router) {

  }
  async login(username: string, password: string) {
    signInWithEmailAndPassword(this.auth, username, password).then(u => {
      this.router.navigate(['/']);
    })
  }

  async logout() {
    signOut(this.auth)
  }
}
