import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../model/user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn: boolean;
  state: User[]

  constructor() { 
    this.isLoggedIn = false;
    this.state = [
      {username: 'guestUser',
      password: 'password'}
    ] as User[];
  }

  login(username: string, password: string): Observable<boolean> {
    return of(this.state)
    .pipe((switchMap((users) => {
      let foundUser = users.some((user) => {
        return user.username === username && user.password === password;
      })
      if (foundUser) {
        this.isLoggedIn = true;
        return of(true);
      } else {
        return throwError('Invalid Username/Password');
      }
    })));
  }

  checkStatus(): boolean {
    return this.isLoggedIn;
  }

}
