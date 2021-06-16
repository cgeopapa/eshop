import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import User from "./utils/User";
import Product from "./utils/Product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly products: Observable<Product[]>;
  private user: User;
  private updateProductsObserver;

  constructor(private rest: RestService) {
    this.products = new Observable<Product[]>(observer => {
      this.rest.getUser().then(user => {
        this.user = user;
        observer.next(user.products);
      })

      this.updateProductsObserver = function (newProductList: Product[]) {
        observer.next(newProductList);
      };
    });
  }

  public async getUser(): Promise<User> {
    if (!this.user) {
      this.user = await this.rest.getUser();
      return this.user;
    } else {
      return this.user;
    }
  }

  public getProducts(): Observable<Product[]> {
    return this.products
  }

  public updateProducts(products: Product[]) {
    this.updateProductsObserver(products);
  }
}
