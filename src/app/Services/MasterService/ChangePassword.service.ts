
import { Component } from "@angular/core";
import { CommonHTTPRequestsService } from "./../CommonHTTPRequests.service";
import { GlobalParametersService } from "./../GlobalParameters.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePassword } from "../../Models/MasterModels/ChangePasswordModel";
import { UpdateData } from "../../Models/UpdateData";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  ChangePassword: ChangePassword[];


  constructor(
    private HTTPRequests: CommonHTTPRequestsService,
    private GlobalParameters: GlobalParametersService) {
  }


// ChangePasswordForUserRequest(userInput: string ): Observable<any> {
//   return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Login/Update/UserChangePassword?userInput=${userInput}`)
// }

}
