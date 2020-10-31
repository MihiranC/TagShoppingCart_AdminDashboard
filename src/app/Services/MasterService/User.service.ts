
import { Component } from "@angular/core";
import { CommonHTTPRequestsService } from "./../CommonHTTPRequests.service";
import { GlobalParametersService } from "./../GlobalParameters.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from "../../Models/MasterModels/UserModel";
import { UpdateData } from "../../Models/UpdateData";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Users[];
  UpdateData: UpdateData[];

  constructor(
    private HTTPRequests: CommonHTTPRequestsService,
    private GlobalParameters: GlobalParametersService) {
  }

  InsertUsers(users: Users): Observable<any> {
    return this.HTTPRequests.RequestPOST(users, `${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Users/Insert`)
  }

  UpdateUsers(UpdateData: UpdateData): Observable<any> {
    return this.HTTPRequests.RequestPOST(UpdateData, `${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Users/Update`)
  }

  DeleteUsers(users: Users): Observable<any> {
    return this.HTTPRequests.RequestPOST(users, `${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Users/Delete`)
  }

  ReturnUsers(userId: number): Observable<any> {
    return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Users/Select?userId=${userId}`)
}
}
