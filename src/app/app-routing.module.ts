import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductComponent } from './product/product.component';
import { ShippingComponent } from './shipping/shipping.component';

const routes: Routes = [
  {path: 'Products', component: ProductComponent},
  {path:'' , component : HomepageComponent},
  {path: 'Cart', component: CartComponent},
  {path: 'Shipping', component: ShippingComponent}, 
  {path: 'AddProduct' , component : NewProductComponent},
  {path: '**',redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
