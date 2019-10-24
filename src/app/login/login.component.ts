import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  hintUsername: string;
  hintPassword: string;
  form: FormGroup;
  isClicked: boolean;
  invalidCredentialsMessage: string;
  formGroupListener: Subscription;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router) { 
    this.hintUsername = `${'&nbsp'.repeat(18)}`;
    this.hintPassword = `${'&nbsp'.repeat(16)}`;
    this.isClicked = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.formGroupListener = this.form.valueChanges
    .subscribe(() => {
      this.invalidCredentialsMessage = null;
    });
  }

  show() {
    this.hintUsername = '"guestUser"';
    this.hintPassword = '"password"';
  }

  hide() {
    this.hintUsername = `${'&nbsp'.repeat(18)}`;
    this.hintPassword = `${'&nbsp'.repeat(16)}`;
  }

  login() {
    this.isClicked = true;
    if (this.form.valid) {
      this.userService.login(this.form.value.username, this.form.value.password)
      .pipe(switchMap(() => {
        this.router.navigate(['menu']);
        return of(true);
      }))
      .pipe(catchError((err) => {
        this.invalidCredentialsMessage = err;
        return of(false);
      }))
      .subscribe();
    }
  }

  ngOnDestroy() {
    if (this.formGroupListener) {
      this.formGroupListener.unsubscribe();
    }
  }
}
