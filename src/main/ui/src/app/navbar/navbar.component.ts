import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";
import {UserService} from "../user.service";
import User from "../utils/User";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: User = {uname: "fetching your details...", products: []};

  constructor(private rest: RestService, private userService: UserService) {
  }

  async ngOnInit() {
    this.user = await this.userService.getUser();
  }
}
