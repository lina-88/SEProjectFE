import { Component, OnInit } from '@angular/core';
import { product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']

})
export class ProductComponent implements OnInit {
  products : product[] | null  = [];
  product ?: product;


  constructor(private httpService: ProductService) { }

  ngOnInit(): void {
    this.httpService.getProducts('/api/Product').subscribe( res => {this.products = res.body ,  console.log(res.body)})
   
  }

}
