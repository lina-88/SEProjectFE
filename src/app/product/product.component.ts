import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/models/CartItem.model';
import { product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';
import { CartService } from '../shared/services/cart.services';
import { CartItemProductsPage } from '../shared/models/CartItemProductsPage.models';
import { User } from '../shared/models/User.models';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']

})
export class ProductComponent implements OnInit {
  products?: product[] | null = [];
  // productsFinal : product[] | null  = [];
  // i = 0 ;
  product?: product;
  category = "All Categories";
  x: product = {
    id: 0, name: "milk",
    picture: "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2015/08/thumb_720_450_1495_f.jpg",
    category: "Dairy", price: 124
  };
  y: product = {
    id: 1, name: "milk",
    picture: "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2015/08/thumb_720_450_1495_f.jpg",
    category: "Dairy", price: 124
  };
  count = 1;
  addToCartFlag = false;
  CartItems: CartItemProductsPage[] | null = [];
  UserId = 1;
  i = 0;


  user: User = {
    Id: 1,
    name: "dareen",
    address: "home",
    city: "London"
  }


  constructor(private httpService: ProductService, private httpServiceCart: CartService) { }

  ngOnInit(): void {
    this.httpService.getProducts('/api/Product').subscribe(res => { this.products = res.body, console.log(res.body) })
    this.httpServiceCart.GetUserCartItemsProductsPage('/api/CartItem', this.UserId).subscribe(res => { this.CartItems = res.body, console.log(res.body) })
    // this.products?.push(this.x); this.products?.push(this.y);
    // this.CartItems?.push({  NumberOfProducts: 2, TotalPrice: 123,  User: this.user,  Product: this.x  });
  }

  getProductsCategories() {
    if (this.category === "All Categories") {
      this.httpService.getProducts('/api/Product').subscribe(res => { this.products = res.body, console.log(res.body) })
    }
    else {
      this.httpService.getProducts('/api/Product').subscribe(res => { this.products = res.body?.filter(product => product.category === this.category), console.log(res.body) })
    }
  }

  decrementCount(p: product) {
    for (this.i = 0; this.i < this.CartItems!.length; this.i = this.i + 1) {
      if ((this.CartItems![this.i]).Product === p) {
        if ((this.CartItems![this.i]).NumberOfProducts == 1) {
          
          //delete from backend

          return;
        }
        else {
          (this.CartItems![this.i]).NumberOfProducts = (this.CartItems![this.i]).NumberOfProducts - 1;
          (this.CartItems![this.i]).TotalPrice = (this.CartItems![this.i]).TotalPrice - p.price;

          //put backend

          return;
    }}}}



    incrementCount(p: product) {
      for (this.i = 0; this.i < this.CartItems!.length; this.i = this.i + 1) {
        if ((this.CartItems![this.i]).Product === p) {
          (this.CartItems![this.i]).NumberOfProducts = (this.CartItems![this.i]).NumberOfProducts + 1;
          (this.CartItems![this.i]).TotalPrice = (this.CartItems![this.i]).TotalPrice + p.price;
          
          //put backend
          
          return;
      }}}

  checkInCart(p: product) {

    //get backend

    for (this.i = 0; this.i < this.CartItems!.length; this.i = this.i + 1) {
      if ((this.CartItems![this.i]).Product === p) {
        this.count = (this.CartItems![this.i]).NumberOfProducts;
        this.addToCartFlag = true;
        return true;
      }
    }
    this.count = 1;
    this.addToCartFlag = false;
    return false;
  }

  addNewItemToCart(p: product) {

    //post backend

    this.CartItems?.push({
      NumberOfProducts: 1,
      TotalPrice: p.price,
      User: this.user,
      Product: p
    });

  }
}



