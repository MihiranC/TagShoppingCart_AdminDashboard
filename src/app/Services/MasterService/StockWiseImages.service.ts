
import { Component } from "@angular/core";
import { CommonHTTPRequestsService } from "./../CommonHTTPRequests.service";
import { GlobalParametersService } from "./../GlobalParameters.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockWiseImages } from "../../Models/MasterModels/StockWiseImagesModel";
import { UpdateData } from "../../Models/UpdateData";

@Injectable({
  providedIn: 'root'
})
export class StockWiseImagesService {

  StockWiseImages: StockWiseImages[];
  UpdateData: UpdateData[];

  constructor(
    private HTTPRequests: CommonHTTPRequestsService,
    private GlobalParameters: GlobalParametersService) {
  }

  InsertStockWiseImages(stocks: StockWiseImages): Observable<any> {
    return this.HTTPRequests.RequestPOST(stocks, `${this.GlobalParameters.primarySCAPI}api/ShoppingCart/Ref_StockWiseImages/Insert`)
  }

  UpdateStockWiseImages(stocks: UpdateData): Observable<any> {
    return this.HTTPRequests.RequestPOST(stocks, `${this.GlobalParameters.primarySCAPI}api/ShoppingCart/Ref_StockWiseImages/Update`)
  }

  DeleteStockWiseImages(stocks: StockWiseImages): Observable<any> {
    return this.HTTPRequests.RequestPOST(stocks, `${this.GlobalParameters.primarySCAPI}api/ShoppingCart/Ref_StockWiseImages/Delete`)
  }

  ReturnStocksWiseImages(imageID: number,stockID: number): Observable<any> {
    return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primarySCAPI}api/ShoppingCart/Ref_StockWiseImages/Select?imageID=${imageID}&&stockID=${stockID}`)
  }

}
