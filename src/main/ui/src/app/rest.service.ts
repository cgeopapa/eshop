import {Injectable} from '@angular/core';
import {AuthenticationRequest} from "./utils/AuthenticationRequest";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import Product from "./utils/Product";
import User from "./utils/User";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private readonly url: string = "https://localhost:8080";

  constructor(private http: HttpClient) {
  }

  public async loginRequest(credentials: AuthenticationRequest): Promise<boolean> {
    const resp = await this.http.post(this.url + '/login', {
      uname: credentials.uname,
      password: credentials.password
    }, {
      observe: 'response',
      withCredentials: true
    }).toPromise();
    return resp.ok;
  }

  public productsRequest() {
    return this.http.get(this.url + '/products', {
      headers: this.generateAuthHeader(),
      observe: 'response',
    }).toPromise()
      .then(res => <Product[]>res.body)
      .then(products => {
        return products;
      });
  }

  public async getUser() {
    return this.http.get('http://localhost:8080/user', {
      headers: this.generateAuthHeader(),
      observe: 'response',
    }).toPromise()
      .then(user => <User>user.body)
      .then(user => {
        return user;
      });
  }

  public addProductToCart(pid: number) {
    const params = new HttpParams().set("pid", String(pid));
    return this.http.post(this.url + "/addToCart", {}, {
      headers: this.generateAuthHeader(),
      withCredentials: true,
      params: params,
      observe: 'response'
    }).toPromise()
      .then(res => <Product[]>res.body);
  }

  public removeProductFromCart(pid: number) {
    const params = new HttpParams().set("pid", String(pid));
    return this.http.delete(this.url + "/addToCart", {
      headers: this.generateAuthHeader(),
      withCredentials: true,
      params: params,
      observe: 'response'
    }).toPromise()
      .then(res => <Product[]>res.body);
  }

  public generateAuthHeader(): HttpHeaders {
    let ca: Array<string> = document.cookie.split(';');
    const prefix: string = "jwt-auth-token=";
    for (let cookie of ca) {
      if (cookie.startsWith(prefix)) {
        const jwt = cookie.substr(prefix.length);
        return new HttpHeaders().append("Authorization", `Bearer ${jwt}`);
      }
    }
    return null;
  }
}
