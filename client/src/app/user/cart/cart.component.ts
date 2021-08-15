import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/request.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any;
  totalPrice: number = 0;

  constructor(public requestService: RequestService, public router: Router, private userService: UserService) { }

  removeItem($event: any) {
    let storedCart: any = localStorage.getItem('cart-items');
    let convertCart: any = JSON.parse(storedCart);
    let id = $event.target.id;

    function numToPop () {
        for (let i = 0; i < convertCart.length; i++) {
            if (convertCart[i].id === id) {
                return i;
            }
        }

        return null;
    };

    let popNum = numToPop();

    convertCart.splice(popNum, 1);

    if (convertCart.length < 1) {
        localStorage.removeItem('cart-items');
        return;
    }

    localStorage.setItem('cart-items', JSON.stringify(convertCart));
  }

  makeOrder() {

    if (!this.userService.isLogged) {
      const redirectUrl = '/login';
      this.router.navigate([redirectUrl]);
      return;
    }

    const userid = localStorage.getItem('user-id');
    const total = this.totalPrice;
    let storedCart: any = localStorage.getItem('cart-items');
    let convertCart: any = JSON.parse(storedCart);

    let data = {userid, products: convertCart, total}

    this.requestService.makeOrder(data).subscribe({
      next: (data) => {
        localStorage.removeItem('cart-items');
        const redirectUrl = '/orders';
        this.router.navigate([redirectUrl]);
        return;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    let storedCart: any = localStorage.getItem('cart-items');
    let convertCart: any = JSON.parse(storedCart);
    this.cart = convertCart;

    let sumArray: any = [];

    for (let item of convertCart) {
      let discountedPrice = (item.price - (item.price * (item.discount / 100))).toFixed(2);
      item.discountedPrice = discountedPrice;
      sumArray.push(+discountedPrice);
    }
    
    this.totalPrice = sumArray.reduce((a: number, b: number) => a + b, 0);
  }

}
