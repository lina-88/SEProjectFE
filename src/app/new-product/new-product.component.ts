import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  error = false;
  add=true;
  errorAlert = "An error occured while adding product!";

  @ViewChild('f') productForm!: NgForm;
  constructor(private httpService: ProductService) { }

  ngOnInit(): void {
  }
  onSubmit(productForm: NgForm): void { 
    var product = {
      name : this.productForm.form.value.name,
      price : this.productForm.form.value.price,
      picture : this.productForm.form.value.picture,
      category : this.productForm.form.value.category,
    }  
    this.httpService.addProduct('/api/Product'  , product).subscribe(res => { console.log(res.body) , this.add=false },
    error => {this.error = error }  );

 }

  
}
