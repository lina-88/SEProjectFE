import { Product } from "./Product";


export interface ShoppingCart{
    Id :number;
    NumberProducts:number;
    TotalPrice:number;
    UserId:number;
    Products:Product[];
}
       