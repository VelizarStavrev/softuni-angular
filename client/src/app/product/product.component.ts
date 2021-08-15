import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { IProduct } from '../interfaces/request';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  selectedOption: string = '0';
  successMessage: string = '';
  errorMessage: string = '';
  product: any = {};
  price: number = 0;
  discount: number = 0;
  discountedPrice: any = 0;
  stars: number[] = [];
  mainImgNumber: number = 1;

  addToCart() {
    this.errorMessage = '';
    this.successMessage = '';

    let cartCheck = localStorage.getItem('cart-items');
    let shoeSize = this.selectedOption;

    if (shoeSize == '0') {
      this.errorMessage = 'Изберете размер!';
      return;
    }

    // if cart doesn't have items
    if (cartCheck === null) {
      localStorage.setItem('cart-items', JSON.stringify([{ id: this.product._id, size: shoeSize, price: this.product.price, discount: this.product.discount }]));
      return;
    }

    // if cart has items
    let convertOldCart = JSON.parse(cartCheck);
    let newCart = convertOldCart;
    newCart.push({ id: this.product._id, size: shoeSize, price: this.product.price, discount: this.product.discount });
    localStorage.setItem('cart-items', JSON.stringify(newCart));

    // Show message to the user
    this.successMessage = 'Добавено в количката!';
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
