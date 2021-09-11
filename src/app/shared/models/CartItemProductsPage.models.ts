import { product } from "./product.model";
import { User } from "./User.models";

export interface CartItemProductsPage{
    NumberOfProducts : number;
    TotalPrice : number;
    User:User;
    Product:product;
}