import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginMessage: string = '';

  constructor(public userService: UserService, public activatedRoute: ActivatedRoute, public router: Router) {}

  login(form: NgForm): void {

    if (form.invalid) { 
      return; 
    }

    const { email, password } = form.value;

    this.userService.loginUser({ email, password }).subscribe({
      next: (data) => {

        if (data.message !== 'OK') {
          this.loginMessage = 'Invalid username or password!';
          return null;
        }

        if (data.message === 'OK') {
            localStorage.setItem('user-id', data.userid);
            localStorage.setItem('user-token', data.token);
            this.loginMessage = '';
            const redirectUrl = this.activatedRoute.snapshot.queryParams.redirectUrl || '/profile';
            this.router.navigate([redirectUrl]);
            return null;
        }
        return;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
