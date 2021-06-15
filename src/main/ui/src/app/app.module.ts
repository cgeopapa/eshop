import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProductsComponent} from './products/products.component';
import {AuthGuardService} from "./auth-guard.service";
import {NavbarComponent} from './navbar/navbar.component';
import {DataViewModule} from "primeng/dataview";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {GridViewItemComponent} from './grid-view-item/grid-view-item.component';
import {CartComponent} from './cart/cart.component';
import {SidebarModule} from "primeng/sidebar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OrderListModule} from "primeng/orderlist";
import {SharedModule} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    NavbarComponent,
    GridViewItemComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataViewModule,
    CardModule,
    ButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    OrderListModule,
    SharedModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
