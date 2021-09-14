import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'Products', component: ProductComponent},
  {path: 'User', component: UserComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Shipping', component: ShippingComponent}, 
  {path: 'ShoppingCart', component: ShoppingcartComponent},
  {path: '**',redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
