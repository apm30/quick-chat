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
  public displayName: string;
  public photoUrl: string;
  public currentUserUid: string;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log('user signed in as ', user);
        this.displayName = user.displayName;
        this.photoUrl = user.photoURL;
        this.currentUserUid = user.uid;
      } else {
        console.log('user not signed in');
        this.displayName = '';
        this.photoUrl = '';
        this.currentUserUid = '';
      }
    });
    this.isSignedInStream = this.afAuth.authState.pipe(
      map<firebase.User, boolean>((user: firebase.User) => {
        return user != null;
      })
    );
  }

  // signInWithGoogle(): void {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   this.afAuth.auth.signInWithPopup(provider).then((user: firebase.User) => {
  //     this.router.navigate(['/']);
  //   });
  // }

  signInWithGoogle(): void {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result: any) => {
        this.router.navigate(['/']);
        const user: firebase.User = result.user;
        // this.authorService.updateAuthor(user.uid, user.displayName, user.photoURL);
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);
  }
}
