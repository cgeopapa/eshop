import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import User from "./utils/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  constructor(private rest: RestService) {
  }

  public async getUser(): Promise<User> {
    if (!this.user) {
      this.user = await this.rest.getUser();
    }
    return this.user;
  }
}
