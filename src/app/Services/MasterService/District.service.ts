
import { Component } from "@angular/core";
import { CommonHTTPRequestsService } from "./../CommonHTTPRequests.service";
import { GlobalParametersService } from "./../GlobalParameters.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Districts } from "../../Models/MasterModels/DistrictModel";
import { UpdateData } from "../../Models/UpdateData";

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  districts: Districts[];
  UpdateData: UpdateData[];

  constructor(
    private HTTPRequests: CommonHTTPRequestsService,
    private GlobalParameters: GlobalParametersService) {
  }

  InsertDistricts(districts: Districts): Observable<any> {
    return this.HTTPRequests.RequestPOST(districts, `${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Ref_Districts/Insert`)
  }

  UpdateDistricts(UpdateData: UpdateData): Observable<any> {
    return this.HTTPRequests.RequestPOST(UpdateData, `${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Ref_Districts/Update`)
  }

  DeleteDistricts(districts: Districts): Observable<any> {
    return this.HTTPRequests.RequestPOST(districts, `${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Ref_Districts/Delete`)
  }

  ReturnDistricts(distictId: number): Observable<any> {
    return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Ref_Districts/Select?districtID=${distictId}`)
}
}
