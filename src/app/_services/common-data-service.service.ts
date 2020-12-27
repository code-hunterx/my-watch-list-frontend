import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import {map,catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import * as _ from 'lodash';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  
  constructor(private http: HttpClient) { }

  get(url:string):Observable<any>{
    const httpHeaders :HttpHeaders= new HttpHeaders({ 'Content-Type' :'application/json'});
    const options = {headers:httpHeaders}
    return this.http.get(`${environment.apiUrl}/${url}`,options).pipe(
      map((res:any)=>{
        if(res.status===200){
          const response:any =res;
          return response.response?response.response:Response; 
        }else if(res.status ===undefined || typeof(res.status) ==='object'){
          return res;
        }
      })
    )
  }

  post(url:string,requestData):Observable<any>{
    const httpHeaders :HttpHeaders= new HttpHeaders({ 'Content-Type' :'application/json'});
    const options = {headers:httpHeaders}
    return this.http.post(`${environment.apiUrl}/${url}`,requestData,options).pipe(
      map((res:any)=>{
        if(res.status===200){
          const response:any =res;
          return response.response?response.response:Response; 
        }else if(res.status ===undefined || typeof(res.status) ==='object'){
          return res;
        }
      })
    )
  }

}
