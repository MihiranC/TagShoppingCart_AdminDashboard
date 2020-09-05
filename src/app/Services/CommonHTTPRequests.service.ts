
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({providedIn:'root'})
export class CommonHTTPRequestsService {
 
    
  constructor(public http: HttpClient) {
  }
 
  RequestGET(url:string): Observable<any> {
    console.log('RequestGET '+url)
    return this.http.get<any>(url)
  }
 
  RequestPOST(jsonData:any,url:string): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(jsonData);
    console.log('RequestPOST - DATA',body)
    console.log('RequestPOST - URL',url)
    return this.http.post(url, body,{'headers':headers})
  }
 
}
 