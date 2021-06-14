import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";
import {AuthenticationRequest} from "../utils/AuthenticationRequest";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public credentials: AuthenticationRequest = new AuthenticationRequest("", "");

  private returnUrl: any;

  constructor(
    private rest: RestService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get("returnUrl");
  }

  async onSubmit() {
    const loggedIn: boolean = await this.rest.loginRequest(this.credentials);
    if (loggedIn) {
      await this.router.navigate([this.returnUrl]);
    }
  }
}
