import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { IProduct } from '../interfaces/request';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any = {};
  price: number = 0;
  discount: number = 0;
  discountedPrice: any = 0;
  stars: number[] = [];
  mainImgNumber: number = 1;

  addToCart() {

    // TO DO - create a cart service
    console.log('Add to cart clicked!');

    // let cartCheck = JSON.parse(localStorage.getItem('cart-items'));

    // if (cartCheck == null) {
    //   localStorage.setItem('cart-items', JSON.stringify([{ id: match.params.id, size, price: items.price, discount: items.discount }]));
    //   setCart([{ id: match.params.id, size, price: items.price, discount: items.discount }]);
    //   return;
    // }

    // cartCheck.push({ id: match.params.id, size, price: items.price, discount: items.discount });
    // localStorage.setItem('cart-items', JSON.stringify(cartCheck));
    // setCart(cartCheck);
  }

  changePictureToClicked(e: any) {
    let imgSrc = e.target.src;
    let imgSrcNumber = imgSrc.slice(-5, -4);
    this.mainImgNumber = imgSrcNumber;
  }

  constructor(public requestService: RequestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => {
        return this.requestService.loadProductById(id);
      }),
    ).subscribe(product => {
      this.product = product;

      this.price = this.product.price.toFixed(2);
      this.discount = this.product.discount.toFixed(0);
      this.discountedPrice = (this.price - (this.price * (this.discount / 100))).toFixed(2);

      for (let i = 0; i < Math.round(this.product.rating); i++) {
        this.stars.push(1);
      }
    });
  }
}
