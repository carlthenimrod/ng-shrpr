import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { UserInterface } from '../../../core/user.interface';
import { UserService } from '../../../core/user.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login-form.component.html',
  styleUrls: ['../login.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  signinError: boolean = false;

  private subscriptions = new Subscription();

  constructor(
    public userService: UserService,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });

    console.log(this.auth.loggedIn());
  }

  onLogin() {

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.subscriptions.add(this.auth.login(email, password)
      .subscribe(
        response => {
          localStorage.setItem('access_token', response.access_token);
          console.log(response.access_token);
          this.router.navigateByUrl('student/62');
        },
        error => {
          console.log(error)
          this.signinError = true;
        }
      ));
  }
}