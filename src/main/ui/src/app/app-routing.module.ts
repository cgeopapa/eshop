import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from "./auth-guard.service";
import {ProductsComponent} from "./products/products.component";
import {PaymentComponent} from "./payment/payment.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: '', component: ProductsComponent, canActivate: [AuthGuardService]},
  {path: "payment", component: PaymentComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
