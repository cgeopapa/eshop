import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: any = {uname: "fetching your details..."};

  constructor(private rest: RestService) {
  }

  ngOnInit(): void {
    this.rest.getUser().then(user => {
      this.user = user.body;
    });
  }

}
