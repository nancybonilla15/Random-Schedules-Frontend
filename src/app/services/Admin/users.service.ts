import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  createNewUser(userData: any){
    return this.http.post<any>(this.URL + '/users/create', userData)
  }

  getUsers(){
    return this.http.get<any>(this.URL + '/users/get')
  }

  deleteUser(id: String){
    return this.http.post<any>(this.URL + '/users/delete', {id})
  }

  updateUser(userData: any){
    return this.http.post<any>(this.URL + '/users/update', userData)
  }
}
