import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../users.API_Config';
import { sendLoginUser } from '../Interfaces/users.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient) { }

  signUpUser(userSignUpData : any){
return this.http.post(config.API_signup,userSignUpData)
  }
  logInUser(userLoginData : sendLoginUser){
return this.http.post(config.API_signin,userLoginData)
  }
}
