import {Component, Input, OnInit} from '@angular/core';
import Product from "../utils/Product";
import {RestService} from "../rest.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() product: Product;

  constructor(private rest: RestService, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  removeProduct() {
    this.rest.removeProductFromCart(this.product.pid).then(products => {
      this.userService.updateProducts(products);
    })
  }
}
