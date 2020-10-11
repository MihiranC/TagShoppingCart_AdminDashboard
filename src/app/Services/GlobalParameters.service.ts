import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GlobalParametersService {
  primaryAdminAPI: String;
  primarySCAPI: String;

  constructor() {
    this.primaryAdminAPI = 'http://localhost:55011/'
    this.primarySCAPI = 'https://localhost:44302/';

    // mihiran
  }
}


