import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profileLink = this.userService.isLogged ? '/profile' : '/login';
  profileText = this.userService.isLogged ? 'ПРОФИЛ' : 'ВХОД';
  cart: any = localStorage.getItem('cart-items');
  cartConvert = JSON.parse(this.cart);
  cartCount = this.cartConvert ? this.cartConvert.length : 0;
  cartTotal = this.cartConvert ? this.calculateCartTotal() : '0.00';

  calculateCartTotal() {
    let sumArray: any = [];

    for (let item of this.cartConvert) {
      let discountedPrice = (item.price - (item.price * (item.discount / 100))).toFixed(2);
      item.discountedPrice = discountedPrice;
      sumArray.push(+discountedPrice);
    }
    
    return sumArray.reduce((a: number, b: number) => a + b, 0);
  }

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
