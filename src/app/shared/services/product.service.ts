import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:60547';
  constructor(private httpClient: HttpClient) { }

  getProducts(url : String){
   return this.httpClient.get<product []>(this.baseUrl + url , {
      observe:'response'
    })
  }
  addProduct(url: string, _json: { name: any; price: any; picture: any; category: any; } ) {
    return this.httpClient.post<product[]>(this.baseUrl + url, _json, { observe:
   'response' })
    }
}
