import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMessage: string = '';

  constructor(public userService: UserService, public activatedRoute: ActivatedRoute, public router: Router) { }

  register(form: NgForm): void {

    this.errorMessage = '';

    if (form.invalid) { 
      return; 
    }

    const { email, reemail, password, repassword, name, phone } = form.value;

    if (email !== reemail) {
      this.errorMessage = 'Имейлите не съвпадат!';
      return;
    }

    if (password !== repassword) {
      this.errorMessage = 'Паролите не съвпадат!';
      return;
    }

    this.userService.registerUser({ email, password, name, phone }).subscribe({
      next: () => {
        this.userService.loginUser({ email, password }).subscribe({
          next: (data) => {
    
            if (data.message !== 'OK') {
              this.errorMessage = 'Invalid username or password!';
              return null;
            }
    
            if (data.message === 'OK') {
                localStorage.setItem('user-id', data.userid);
                localStorage.setItem('user-token', data.token);
                this.errorMessage = '';
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

        return;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
