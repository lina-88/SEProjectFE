import { product } from "./product.model";

export interface CartItem{
    id :  number;
    NumberOfProducts : number;
    TotalPrice : number;
    //User:User;
    Product:product|null;


}