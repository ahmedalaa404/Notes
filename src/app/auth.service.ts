import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import jwtDecode from 'jwt-decode';
jwtDecode
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService

{
  currentData:any= new BehaviorSubject(null);
  baseUrl:string=`https://sticky-note-fe.vercel.app`

  constructor(private _HttpClient:HttpClient,private _Router:Router) 
  {  
    this.loginisCurrent()
  }



    logout()
    {
      localStorage.clear();
      this._Router.navigate(['login']);
      this.currentData.next(null)
    }

  CuurentUser()
  { 
    let encode=JSON.stringify(localStorage.getItem('tokenUser'));
    let decode=jwtDecode(encode)
    this.currentData.next(decode)
  }


  RegisterForm(fromObj:object):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'/signup',fromObj)
  }

  login(fromObj:object):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'/signin',fromObj)
  }


 loginisCurrent()
 {
  if(localStorage.getItem('tokenUser')!=null)
    {
      this.CuurentUser();
    }
 }

}
