
import { Component } from "@angular/core";
import { CommonHTTPRequestsService } from "./../CommonHTTPRequests.service";
import { GlobalParametersService } from "./../GlobalParameters.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../Models/MasterModels/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  loginObject: Login  = new  Login();

  constructor(
    private HTTPRequests: CommonHTTPRequestsService,
    private GlobalParameters: GlobalParametersService) {
  }



verifiedUserCredentials(username: string , password: string): Observable<any> {
  return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Login/Select?username=${username}&password=${password}`)
}

}
