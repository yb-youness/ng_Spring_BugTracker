import { Injectable } from '@angular/core';
//! Http Module
import { HttpClient, HttpHeaders } from '@angular/common/http';
//! Bug Model
import { Bug } from '../Models/Bug';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private HOST = 'http://localhost:8080/api/v1';
  constructor(private _HttpCl: HttpClient) {}
  //* Api Calls
  //! Get All Bugs
  getBugs(): Observable<Bug[]> {
    return this._HttpCl.get<Bug[]>(`${this.HOST}/getAll`);
  }
  //! Post A Bug
  AddBug(bug: Bug): Observable<Bug> {
    return this._HttpCl.post<Bug>(`${this.HOST}/Add`, bug);
  }
  //! DELETE Bug
  DeletBug(id: any): Observable<Bug> {
    return this._HttpCl.delete<Bug>(`${this.HOST}/${id}`);
  }
  //! Edit Bug
  EditBug(bug: Bug): Observable<Bug> {
    return this._HttpCl.put<Bug>(`${this.HOST}/${bug.id}`, bug);
  }
}
