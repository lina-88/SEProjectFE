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
   UserId=0;
   CartItem : CartItem={
    id :0,
    NumberOfProducts :0,
    TotalPrice :0,
    //User:User,
    Product:null
   }

  constructor(private httpService: CartService) { }

  ngOnInit(): void {

  }
   GetUserCartItems(){
    this.httpService.GetUserCartItems('/api/CartItem',this.UserId).subscribe( res => {this.CartItems = res.body ,  console.log(res.body)})

   }

   AddCartItem(){
    this.httpService.addCartItem('/api/CarItem',this.CartItem).subscribe(res=>{
      console.log(res.body)
    });
   }
}
