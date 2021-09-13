import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from '../shared/models/CartItem.model';
import { CartItemBE } from '../shared/models/CartItemBE.model';
import { product } from '../shared/models/product.model';
import { User } from '../shared/models/User.models';
import { CartService } from '../shared/services/cart.services';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styles:  []
})
export class ShoppingcartComponent implements OnInit {
  
  products?: product[] | null = [];
  CartItems : CartItem[] | null  = [];
  User:User={
   Id : 2,
   name : "noha",
   address : "heliopolis",
   city : "cairo" ,
  };
  TotalCartPrice:number=0;
  UpdatedCartItem:CartItemBE={
   numberOfProducts : 0,
   totalPrice : 0,
   UserId:0,
   ProductId:0,
   user:{   Id : 0,
     name : "",
     address : "",
     city : "" ,},
   product:{
     id :  0,
     name : "",
     price : 0,
     picture : "",
     category : "",
   }
  }
 

 

 constructor(private httpService: CartService, private httpProductService: ProductService) { }

 ngOnInit(): void {
  this.httpProductService.getProducts('/api/Product').subscribe(res => { this.products = res.body, console.log(res.body) })

   this.httpService.GetUserCartItems('/api/CartItem',this.User.Id).subscribe( res => {this.CartItems = res.body ,  console.log(res.body)})
}

   GetProductPicture(CartItem: CartItem){
   return CartItem.product.picture;
   }
  GetProductName(CartItem: CartItem){
    return CartItem.product.name;
  }
  GetTotalNum(CartItem: CartItem){
   return CartItem.numberOfProducts;
 }
 GetTotalNumCartItems(){
  return this.CartItems!.length;
}
 GetProductPrice(CartItem: CartItem){
   return CartItem.totalPrice;
 }
 GetTotalPrice(){
   this.CartItems?.forEach(CartItem => {
     this.TotalCartPrice=this.TotalCartPrice+CartItem.totalPrice;
     
   });
   return this.TotalCartPrice;
 }

 IncrementItem(CartItem: CartItem){
      
      for(var i=0;i<this.CartItems!.length;i++){
          if(this.CartItems![i].product.id===CartItem.product.id)
           this.CartItems?.splice(i,1);
      }
      this.UpdatedCartItem.numberOfProducts=CartItem.numberOfProducts+1;
      this.UpdatedCartItem.UserId=this.User.Id;
      this.UpdatedCartItem.ProductId=CartItem.product.id;
      this.UpdatedCartItem.product=CartItem.product;
      this.UpdatedCartItem.user=CartItem.user;
      this.UpdatedCartItem.totalPrice=CartItem.totalPrice+CartItem.product.price;
      this.CartItems?.push(this.UpdatedCartItem);
      console.log(this.UpdatedCartItem);
      this.httpService.UpdateCartItem('/api/CartItem',this.UpdatedCartItem.UserId,this.UpdatedCartItem.ProductId,this.UpdatedCartItem).subscribe( res => {console.log(res.body)});
     
      return;
  
      
     

 }
 DecrementtItem(CartItem: CartItem){
   for(var i=0;i<this.CartItems!.length;i++){
     if(this.CartItems![i].product.id==CartItem.product.id)
      this.CartItems?.splice(i,1);
 }
   this.UpdatedCartItem.numberOfProducts=CartItem.numberOfProducts-1;
   this.UpdatedCartItem.UserId=this.User.Id;
  this.UpdatedCartItem.ProductId=CartItem.product.id;
   this.UpdatedCartItem.product=CartItem.product;
   this.UpdatedCartItem.user=CartItem.user;
   this.UpdatedCartItem.totalPrice=CartItem.totalPrice-CartItem.product.price;
   this.CartItems?.push(this.UpdatedCartItem);
   console.log(this.UpdatedCartItem);
   this.httpService.UpdateCartItem('/api/CartItem',this.UpdatedCartItem.UserId,this.UpdatedCartItem.ProductId,this.UpdatedCartItem).subscribe( res => {console.log(res.body)});
   return;


}

OnCheckout(){
 //go to shipping page
}

}
