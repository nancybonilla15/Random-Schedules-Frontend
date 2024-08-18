import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class MastersService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  registerNewMaster(masterData: any){
    return this.http.post<any>(this.URL + '/signup', masterData)
  }

  getMasters(){
    return this.http.get<any>(this.URL + '/masters')
  }

  deleteUser(id: String){
    return this.http.post<any>(this.URL + '/delete-user', {id})
  }

  updateUser(userData: any){
    return this.http.post<any>(this.URL + '/update-user', userData)
  }
}
