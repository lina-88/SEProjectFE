import { product } from "./product.model";
import { User } from "./User.models";

export interface CartItem{
    
    numberOfProducts : number;
    totalPrice : number;
    user:User;
    product:product;


}