import { product } from "./product.model";
import { User } from "./User.models";

export interface CartItemBE{
    
    numberOfProducts : number;
    totalPrice : number;
    UserId:number;
    user:User;
    ProductId:number;
    product:product;


}