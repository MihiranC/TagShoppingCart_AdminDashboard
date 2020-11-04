
import { Component } from "@angular/core";
import { CommonHTTPRequestsService } from "./../CommonHTTPRequests.service";
import { GlobalParametersService } from "./../GlobalParameters.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../Models/MasterModels/LoginModel';
import {SignUp} from '../../Models/MasterModels/SignUpModel';
import { ChangePassword } from '../../Models/MasterModels/ChangePasswordModel';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  loginObject: Login = new Login();
  ChangePasswordObject: ChangePassword = new ChangePassword();

  //to get details from change password component
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(
    private HTTPRequests: CommonHTTPRequestsService,
    private GlobalParameters: GlobalParametersService) {
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  //to get user name with passing encrypted user name
  GetUserName(encrpUserName: string ): Observable<any> {
    return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Login/GetUserName?encrpUserName=${encrpUserName}`);
  }

  //UserProcessFirstSignup
  UserProcessFirstSignup(SignUpObject: SignUp ): Observable<any> {
    return this.HTTPRequests.RequestPOST(SignUpObject, `${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Login/UserProcessFirstSignup`)
  }

//verified User Credentials
  // verifiedUserCredentials(username: string, password: string): Observable<any> {
  //   return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Login/Select?username=${username}&password=${password}`);
  // }

  //UserProcessFirstSignup
  verifiedUserCredentials(loginObject: Login ): Observable<any> {
    return this.HTTPRequests.RequestPOST(loginObject, `${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Login/UserCheckLogin`)
  }


  //change Password Request
  ChangePasswordForUserRequest(userInput: string ): Observable<any> {
    return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Login/UserChangePasswordRequest?userInput=${userInput}`);
  }

  //change Password
  ChangePasswordForUser(ChangePasswordObject: ChangePassword ): Observable<any> {
    return this.HTTPRequests.RequestPOST(ChangePasswordObject, `${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Login/UserChangePassword`)
  }



}
