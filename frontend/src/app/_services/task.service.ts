import { serverAppURL } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  
  requestOptions = {                                                                    
    headers: new HttpHeaders(this.headerDict), 
  };

  constructor(private http: HttpClient) { }

  backEndCall(data, endPoint): Promise<any>{   
    return this.http.post<any>(serverAppURL+endPoint, JSON.stringify(data), this.requestOptions)
    .toPromise();
  }

  getTasks(filter, endPoint): Promise<any> {    
    return this.http.get<any>(serverAppURL+endPoint)
    .toPromise();
  }
}
