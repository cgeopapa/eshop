import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";
import Product from "../utils/Product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public uname: string;
  public products: Product[];

  constructor(private rest: RestService) {
  }

  ngOnInit(): void {
    this.rest.productsRequest().then(resp => {
      this.products = resp;
      console.log(this.products);
    });
  }
}
