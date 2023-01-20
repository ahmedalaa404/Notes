import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService 
{
  baseUrl:string=`https://sticky-note-fe.vercel.app`;
  addNote(formObj:object):Observable<any>
  {
    return this._http.post(this.baseUrl+'/addnote',formObj)
  }



  getnotes(data:object):Observable<any>
  {
    return this._http.post(this.baseUrl+'/getUserNotes',data)
  }


    updateNote(data:object):Observable<any>
    {
      return this._http.put(this.baseUrl+'/updateNote',data)
    }

    deleteNote(data:object):Observable<any>
    {
      return this._http.delete(this.baseUrl+'/deleteNote',data)
    }


  constructor(private _http:HttpClient) { }
}
