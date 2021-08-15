import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any;
  dataTest: any;

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    const id: any = localStorage.getItem('user-id');
    this.requestService.loadOrdersByUserId(id).subscribe({
      next: (data) => {

        this.dataTest = data;

        if (this.dataTest.length < 1) { 
          return;
        }

        this.orders = data;
        return;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
