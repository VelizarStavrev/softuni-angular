import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  loadFourProducts(type: string) {
    const query = type ? type : 'male';
    return this.http.get<IProduct[]>(`http://localhost:4000/getOneType/${query}/4`);
  }
}
