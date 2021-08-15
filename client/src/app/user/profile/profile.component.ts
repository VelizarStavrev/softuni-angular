import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: string = 'Email error';
  name: string = 'Name error';
  phone: number | string = 'Phone error';
  password: string = '';
  repassword: string = '';
  
  logoutUser() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-token');

    const redirectUrl = '/';
    this.router.navigate([redirectUrl]);
  }

  constructor(public userService: UserService, public router: Router) { }

  updateUser(form: NgForm): void {

    if (form.invalid) { 
      return; 
    }

    const { email, name, phone, password, repassword } = form.value;

    // TO DO
    
    // this.userService.changeUserData({ email, name, phone, password });
    // .subscribe({
    //   next: (data) => {

    //     console.log(data);
    //     return;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
  }

  ngOnInit(): void {
    
    this.userService.getUserData().subscribe({
      next: (data) => {
        this.email = data.email;
        this.name = data.name;
        this.phone = `${0}` + data.phone;
        this.password = data.password;
      }
    })
  }

}
