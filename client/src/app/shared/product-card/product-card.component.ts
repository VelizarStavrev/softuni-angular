import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product:any = {}; // allows this child to use this from it's parent
  price:number = 0;
  discount:number = 0;
  discountedPrice:any = 0;
  sizes:string = '';

  constructor() { }

  ngOnInit(): void {
    this.price = this.product.price.toFixed(2);
    this.discount = this.product.discount.toFixed(0);
    this.discountedPrice = (this.price - (this.price * (this.discount / 100))).toFixed(2);
    this.sizes = this.product.sizes.join(' / ');
  }

}
