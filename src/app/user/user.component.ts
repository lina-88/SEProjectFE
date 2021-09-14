import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/services/user.services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  @ViewChild('f') form!:NgForm
  

  constructor(private httpUserService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(){

  }
 

}
