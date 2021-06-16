import {Component, OnInit} from '@angular/core';
import Product from "../utils/Product";
import {UserService} from "../user.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  cartProducts: Product[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getProducts().subscribe(products => {
      this.cartProducts = products;
    })
  }

  removeProduct() {

  }
}
