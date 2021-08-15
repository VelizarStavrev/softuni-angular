import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { IUserData } from '../interfaces/user-data';
// import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user: IUser | null | undefined = undefined;

  // get isLogged(): boolean {
  //   return !!this.user;
  // }

  constructor(private http: HttpClient) { }

  registerUser(data: { email: string; password: string, name: string, phone: number }) {
    return this.http.post(`http://localhost:4000/register`, data);
  }

  loginUser(data: { email: string; password: string }) {
    return this.http.post<IUser>(`http://localhost:4000/login`, data);
    // .pipe(
    //   tap((user) => this.user = user)
    // );
  }

  getUserData() {
    let userId = localStorage.getItem('user-id');
    return this.http.get<IUserData>(`http://localhost:4000/getOneUser/${userId}`);
  }

  changeUserData(data: { email: string; name: string; phone: number; password: string }) {
    // TO DO
    console.log('works');
    console.log(data);
    return data;
  }
}
