import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GlobalParametersService {
  primaryAdminAPI: String;
  primarySCAPI: String;

  constructor() {
    this.primaryAdminAPI = 'http://localhost:55011/'
    this.primarySCAPI = 'http://192.168.1.93:6559/';
  }
}


