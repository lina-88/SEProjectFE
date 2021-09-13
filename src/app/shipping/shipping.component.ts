import { Component, OnInit, ViewChild } from '@angular/core';
import { CartItem } from '../shared/models/CartItem.model';
import { CartService } from '../shared/services/cart.services';
import { User } from '../shared/models/User.models';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/services/user.services';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.css']
})
export class ShippingComponent implements OnInit {

  @ViewChild('f') form!:NgForm

  CartItems : CartItem[] | null  = [];
   UserId=2;
   TotalCartPrice:number=0;

   PostedUser:User={
    Id:0,  
    name : "",
    address : "",
    city : "" ,
  };


 
  

  constructor(private httpCartService: CartService,private httpUserService: UserService) { }

  ngOnInit(): void {
    this.httpCartService.GetUserCartItems('/api/CartItem',this.UserId).subscribe( res => {this.CartItems = res.body ,  console.log(res.body)})

  }
  
   GetProductName(CartItem: CartItem){
     return CartItem.product.name;
   }
   GetTotalNumOfProducts(){
    return this.CartItems?.length;
  }

  GetTotalPrice(){
    this.CartItems?.forEach(item => {
      this.TotalCartPrice=this.TotalCartPrice+(item.totalPrice);
    });
  }
  
  onSubmit(){
    this.PostedUser.name=this.form.form.value.name;
    this.PostedUser.address=this.form.form.value.address;
    this.PostedUser.city=this.form.form.value.city;

    console.log(this.PostedUser);
     this.httpUserService.PostNewUser('/api/Users',this.PostedUser).subscribe(res=>{
       console.log(res.body)
     });
  
  
    
  }
  resetForm(){
    this.form.reset();
  }

 
 
}



