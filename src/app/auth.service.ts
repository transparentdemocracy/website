import {inject, Injectable} from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root',
  deps: [AngularFireAuthModule]
})
export class AuthService {
  private auth = inject(Auth);
  authState$ = authState(this.auth);

  async login(username: string, password: string) {
    signInWithEmailAndPassword(this.auth, username, password)
  }

  async logout() {
    signOut(this.auth)
  }
}
