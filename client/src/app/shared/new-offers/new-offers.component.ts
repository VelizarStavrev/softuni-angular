import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../../request.service';
import { IProduct } from '../../interfaces/request';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.scss']
})
export class NewOffersComponent implements OnInit {
  @Input() name = '';
  @Input() type = '';
  products:IProduct[] = [];
  
  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.loadProductsByCount(this.type, 4).subscribe(products => this.products = products);
  }
}
