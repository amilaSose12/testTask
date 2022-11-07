import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';



const API_URL: string = 'http://localhost:8000';


@Injectable({
  providedIn: 'root'
})


export class TestServiceService {

  constructor(private http: HttpClient) { }
  
  
  getAll(page: number) {
    return this.http.get(`${API_URL}/getUsersList/${page}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getOneUser(userId: number) {
    return this.http.get(`${API_URL}/getUser/${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateUser(parameters: any) {
    return this.http.post(`${API_URL}/updateUser`, parameters).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  createNewUser(parameters: any) {
    return this.http.post(`${API_URL}/createNewUser`, parameters).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteCurrentUser(userId: number) {
    return this.http.delete(`${API_URL}/deleteUser/${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  } 

  getFilteredUsers(parameters: any, page: number) {
    if(!parameters.search)
    {
      parameters.search = "not_set";
    }
    if(!parameters.status)
    {
      parameters.status = "not_set";
    }
    return this.http.get(`${API_URL}/getFilteredUsers/${parameters.search}/${parameters.status}/${page}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAllPermissionsForUsers() {
    return this.http.get(`${API_URL}/getAllPermissionsForUsers`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  changePermissionForUser(parameters: any) {
    return this.http.post(`${API_URL}/changePermissionForUser`, parameters).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
