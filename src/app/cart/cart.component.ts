import { createDirectiveTypeParams } from '@angular/compiler/src/render3/view/compiler';
import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { CartItem } from '../shared/models/CartItem.model';
import { CartService } from '../shared/services/cart.services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {
  
   
   CartItems : CartItem[] | null  = [];
   UserId=2;
  //  TotalNumberOfProducts?:number=this.CartItems?.length;
   TotalCartPrice:number=0;
 
  

  constructor(private httpService: CartService) { }

  ngOnInit(): void {
    this.httpService.GetUserCartItems('/api/CartItem',this.UserId).subscribe( res => {this.CartItems = res.body ,  console.log(res.body)})
        // this.httpService.GetAllCartItems('/api/CartItem').subscribe( res => {this.CartItems = res.body ,  console.log(res.body)})

  }
   GetUserCartItems(){
    this.httpService.GetUserCartItems('/api/CartItem',this.UserId).subscribe( res => {this.CartItems = res.body ,  console.log(res.body)})

   }
   GetProductName(CartItem: CartItem){
     return CartItem.product.name;
   }

  //  AddCartItem(){
  //   this.httpService.addCartItem('/api/CarItem',this.CartItem).subscribe(res=>{
  //     console.log(res.body)
  //   });
  //  }
}
