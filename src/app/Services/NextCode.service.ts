
import { Component } from "@angular/core";
import { CommonHTTPRequestsService } from "./CommonHTTPRequests.service";
import { GlobalParametersService } from "./GlobalParameters.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NextCode } from "../Models/NextCode";

@Injectable({
  providedIn: 'root'
})
export class NextCodeService {


  constructor(
    private HTTPRequests: CommonHTTPRequestsService,
    private GlobalParameters: GlobalParametersService) {
  }

  ReturnNextCode(prefix: string): Observable<any> {
    return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/NextCode/Select?prefix=${prefix}`)
  }

}
