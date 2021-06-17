import {Component, OnInit} from '@angular/core';
import Product from "../utils/Product";
import {UserService} from "../user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  display: boolean = false;
  cartProducts: Product[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getProducts().subscribe(products => {
      this.cartProducts = products;
    })
  }
}
