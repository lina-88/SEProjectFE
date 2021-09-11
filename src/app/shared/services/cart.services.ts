import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = 'http://localhost:60547';
  constructor(private httpClient: HttpClient) { }

 
  GetUserCartItems(url: string, UserId: number) {
    return this.httpClient.get<CartItem[]>(this.baseUrl + url+"/"+UserId, { observe:
   'response' })
    }

  addCartItem(url: string, CartItem: CartItem) {
      return this.httpClient.post<CartItem>(this.baseUrl + url, CartItem, { observe:
     'response' })
      }
}