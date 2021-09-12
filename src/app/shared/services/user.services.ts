import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.models'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:60547';
  constructor(private httpClient: HttpClient) { }


  

 
  PostNewUser(url: string, User: User) {
    return this.httpClient.post<User>(this.baseUrl + url, User, {
      observe:
        'response'
    })
  }
  UpdateExistingUser(url: string,UserId:number, User: User) {
    return this.httpClient.post<User>(this.baseUrl + url+"/"+UserId, User, {
      observe:
        'response'
    })
  }




}
