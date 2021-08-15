import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  loadProductsByCount(type: string, count?: number) {
    const queryType = type ? type : 'male';
    const queryCount = count ? count : 0;
    return this.http.get<IProduct[]>(`http://localhost:4000/getOneType/${queryType}/${queryCount}`);
  }

  loadProductById(id: number) {
    const queryNumber = id ? id : 0;
    return this.http.get<IProduct[]>(`http://localhost:4000/getOne/${queryNumber}`);
  }

  loadOrdersByUserId(id: number) {
    return this.http.get(`http://localhost:4000/getOrders/${id}`);
  }

  makeOrder(data: any) {
    return this.http.post(`http://localhost:4000/createOrder`, data);
  }
}
