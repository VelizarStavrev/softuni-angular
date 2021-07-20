import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product:any = {}; // allows this child to use this from it's parent
  discountedPrice:number = 0;
  sizes:string = '';
  discount:number = 0;

  constructor() { }

  ngOnInit(): void {
    this.discountedPrice = Number((this.product.price - (this.product.price * (this.product.discount / 100))).toFixed(2));
    this.sizes = this.product.sizes.join(' / ');
    this.discount = this.product.discount.toFixed(0);
  }

}
