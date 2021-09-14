import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/models/User.models';
import { UserService } from '../shared/services/user.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') form!:NgForm
  flag:boolean=true;
  NewUser:User={
    Id:0,  
    name : "",
    address : "",
    city : "" ,
  };

  AllUsers:User[]|null=[];
  message:string="";

  constructor(private httpUserService: UserService) { }

  ngOnInit(): void {
    
  }
  onSubmit(){
    this.httpUserService.GetAllUsers('/api/Users').subscribe( res => {this.AllUsers = res.body ,  console.log(res.body)})

    console.log(this.AllUsers);
   
    this.NewUser.name=this.form.form.value.name;

    //checking if username is unique not working
    for(var i=0;i<this.AllUsers!.length;i++){
      if(this.AllUsers![i].name===this.NewUser.name){
        alert("user name already exists");
        this.flag=false;
       
      }
    }
     if(this.flag===true){
    this.httpUserService.PostNewUser('/api/Users',this.NewUser).subscribe(res=>{
       console.log(res.body)
     
     });
     }
     
    this.message="User is registered successfully";
  }
   

}
