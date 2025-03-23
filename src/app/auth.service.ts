import {inject, Injectable} from '@angular/core';
import {Auth, authState, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root',
  deps: [AngularFireAuthModule]
})
export class AuthService {
  private auth = inject(Auth);
  authState$ = authState(this.auth);

  async login(username: string, password: string) {
    return signInWithEmailAndPassword(this.auth, username, password)
  }

  async logout() {
    signOut(this.auth)
  }

  async resetPassword(username: string) {
    return sendPasswordResetEmail(this.auth, username)
  }

  createUserWithEmailAndPassword(username: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, username, password)
  }
}
