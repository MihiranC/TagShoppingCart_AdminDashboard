
import { Component } from "@angular/core";
import { CommonHTTPRequestsService } from "./../CommonHTTPRequests.service";
import { GlobalParametersService } from "./../GlobalParameters.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stocks } from "../../Models/MasterModels/StockModel";
import { UpdateData } from "../../Models/UpdateData";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stocks: Stocks[];
  UpdateData: UpdateData[];

  constructor(
    private HTTPRequests: CommonHTTPRequestsService,
    private GlobalParameters: GlobalParametersService) {
  }

  InsertStock(stocks: Stocks): Observable<any> {
    return this.HTTPRequests.RequestPOST(stocks, `${this.GlobalParameters.primarySCAPI}api/ShoppingCart/Ref_Stock/Insert`)
  }

  UpdateStock(stocks: UpdateData): Observable<any> {
    return this.HTTPRequests.RequestPOST(stocks, `${this.GlobalParameters.primarySCAPI}api/ShoppingCart/Ref_Stock/Update`)
  }

  DeleteStock(stocks: Stocks): Observable<any> {
    return this.HTTPRequests.RequestPOST(stocks, `${this.GlobalParameters.primarySCAPI}api/ShoppingCart/Ref_Stock/Delete`)
  }

  ReturnStocks(stockID: number): Observable<any> {
    return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primarySCAPI}api/ShoppingCart/Ref_Stock/Select?stockID=${stockID}`)
  }

}
