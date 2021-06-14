import {Injectable} from '@angular/core';
import {AuthenticationRequest} from "./utils/AuthenticationRequest";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import Product from "./utils/Product";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private authHeader: HttpHeaders;

  constructor(private http: HttpClient) {
  }

  public async loginRequest(credentials: AuthenticationRequest): Promise<boolean> {
    const resp = await this.http.post('http://localhost:8080/login', {
      uname: credentials.uname,
      password: credentials.password
    }, {
      observe: 'response',
      withCredentials: true
    }).toPromise();
    return resp.ok;
  }

  public productsRequest() {
    return this.http.get('http://localhost:8080/products', {
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
    }).toPromise();
  }

  private generateAuthHeader(): HttpHeaders {
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
