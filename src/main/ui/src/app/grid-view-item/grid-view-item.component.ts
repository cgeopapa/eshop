import {Component, Input, OnInit} from '@angular/core';
import Product from "../utils/Product";
import {RestService} from "../rest.service";
import {UserService} from "../user.service";
import User from "../utils/User";

@Component({
  selector: 'app-grid-view-item',
  templateUrl: './grid-view-item.component.html',
  styleUrls: ['./grid-view-item.component.scss']
})
export class GridViewItemComponent implements OnInit {
  isAdding: boolean = false;
  isInCart: boolean = false;

  @Input() product: Product;

  private user: User;

  constructor(private rest: RestService, private userService: UserService) {
  }

  async ngOnInit() {
    this.user = await this.userService.getUser();
    for (let product of this.user.products) {
      if (product.pid == this.product.pid) {
        this.isInCart = true;
        break;
      }
    }
  }

  addProduct(event: any) {
    this.isAdding = true;
    this.rest.addProductToCart(this.product.pid).then(products => {
      this.isAdding = false;
      this.isInCart = true;
      this.userService.updateProducts(products);
    });
  }
}
