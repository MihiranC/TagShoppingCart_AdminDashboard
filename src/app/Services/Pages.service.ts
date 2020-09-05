import { Pages } from "../Models/Pages";
import { Component } from "@angular/core";
import { PageHeaders } from "../Models/PageHeaders";
import { CommonHTTPRequestsService } from "./CommonHTTPRequests.service";
import { GlobalParametersService } from "./GlobalParameters.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    pages: Pages[]
    pageHeaders: PageHeaders[] = []

    constructor(
        private HTTPRequests: CommonHTTPRequestsService,
        private GlobalParameters: GlobalParametersService) {
    }


    ReturnPages(userid: number): Observable<any> {
        return this.HTTPRequests.RequestGET(`${this.GlobalParameters.primaryAdminAPI}api/TGAdmin/Pages/Select?userId=${userid}`)
    }
}
