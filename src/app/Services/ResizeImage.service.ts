
import { Component } from "@angular/core";
import { CommonHTTPRequestsService } from "./CommonHTTPRequests.service";
import { GlobalParametersService } from "./GlobalParameters.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResizeImage } from "../Models/ResizeImage";

@Injectable({
  providedIn: 'root'
})
export class ResizeImageService {


  constructor(
    private HTTPRequests: CommonHTTPRequestsService,
    private GlobalParameters: GlobalParametersService) {
  }

  Resize(image: ResizeImage): Observable<any> {
    return this.HTTPRequests.RequestPOST(image, `${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/ImageResize/Resize`)
  }

}
