import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isSignedInStream: Observable<boolean>;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log('user signed in as ', user);
      } else {
        console.log('user not signed in');
      }
    });
    this.isSignedInStream = this.afAuth.authState.pipe(
      map<firebase.User, boolean>((user: firebase.User) => {
        return user != null;
      })
    );
  }

  signInWithGoogle(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((user: firebase.User) => {
      this.router.navigate(['/']);
    });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);
  }
}
