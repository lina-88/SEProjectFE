import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/models/CartItem.model';
import { product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';
import { CartService } from '../shared/services/cart.services';
import { User } from '../shared/models/User.models';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']

})
export class ProductComponent implements OnInit {
  products?: product[] | null = [];
  product?: product;
  category = "All Categories";
  count = 1;
  addToCartFlag = false;
  CartItems: CartItem[] | null = [];
  UserId = 1;


  user: User = {
    Id: 1,
    name: "dareen",
    address: "home",
    city: "cairp"
  }
  CartItem: CartItem = {

    numberOfProducts: 0,
    totalPrice: 0,
    user: {
      Id: 1,
      name: "",
      address: "",
      city: ""
    },
    product: {
      id: 0, name: "",
      picture: "",
      category: "", price: 0
    }
  }


  constructor(private httpService: ProductService, private httpServiceCart: CartService) { }

  ngOnInit(): void {
    this.httpService.getProducts('/api/Product').subscribe(res => { this.products = res.body, console.log(res.body) })
    this.httpServiceCart.GetUserCartItems('/api/CartItem', this.UserId).subscribe(res => { this.CartItems = res.body, console.log(res.body) })

    //get and set user  

    // this.products?.push(this.x); this.products?.push(this.y);
    // this.CartItems?.push({  NumberOfProducts: 2, TotalPrice: 123,  User: this.user,  Product: this.x  });
  }

  getProductsCategories() {
    if (this.category === "All Categories") {
      this.httpService.getProducts('/api/Product').subscribe(res => { this.products = res.body })
    }
    else {
      console.log(this.category);
      this.httpService.getProducts('/api/Product').subscribe(res => { this.products = res.body?.filter(product => product.category === this.category) })
    }
  }

  decrementCount(p: product) {
    for (var i = 0; i < this.CartItems!.length; i = i + 1) {
      if ((this.CartItems![i]).product.id === p.id) {
        if ((this.CartItems![i]).numberOfProducts == 1) {
          //delete from backend
          console.log("DELEEEEEETEEEEE FROM BEEEEEEEEEEEEEEEE");
          this.httpServiceCart.DeleteCartItem('/api/CartItem', this.user.Id, p.id).subscribe(res => { console.log("deleted cartItem") });
          this.CartItems?.splice( i , 1 );
          return;
        }
        else {
          (this.CartItems![i]).numberOfProducts = (this.CartItems![i]).numberOfProducts - 1;
          (this.CartItems![i]).totalPrice = (this.CartItems![i]).totalPrice - p.price;

          //put backend
          this.CartItem = this.CartItems![i];
          this.CartItems?.splice( i , 1 );

          this.httpServiceCart.DecrementCartItem('/api/CartItem', this.user.Id, p.id, this.CartItem).subscribe(res => { console.log(res.body) });

          this.CartItems?.push(this.CartItem);
          return;
        }
      }
    }
  }



  incrementCount(p: product) {

    for (var i = 0; i < this.CartItems!.length; i = i + 1) {

      if ((this.CartItems![i]).product.id === p.id) {
        this.CartItem = this.CartItems![i];
        this.CartItems?.splice(i, 1);
      }
    }

    this.CartItem.numberOfProducts = this.CartItem.numberOfProducts + 1;
    this.CartItem.totalPrice = this.CartItem.totalPrice + p.price;
    this.CartItem.product=p;
    
    this.CartItems?.push(this.CartItem);


    console.log(this.UserId + " pid " + p.id + " " + this.CartItem.product.id + " " + this.CartItem.numberOfProducts);
    this.httpServiceCart.IncrementCartItem('/api/CartItem', this.user.Id, p.id, this.CartItem).subscribe(res => {
      console.log(res.body)
    });

    return;
  
}

checkInCart(p: product) {

  for (var i = 0; i < this.CartItems!.length; i = i + 1) {
    if ((this.CartItems![i]).product.id === p.id) {
      this.count = (this.CartItems![i]).numberOfProducts;
      this.addToCartFlag = true;
      return true;
    }
  }
  this.count = 1;
  this.addToCartFlag = false;
  return false;
}

addNewItemToCart(p: product) {
  this.CartItem = {

    numberOfProducts: 1,
    totalPrice: p.price,
    user: this.user,
    product: p
  }

  this.httpServiceCart.addCartItem('/api/CartItem', this.CartItem).subscribe(res => {
    console.log(res.body), this.CartItems?.push(this.CartItem);
  });



}
}



