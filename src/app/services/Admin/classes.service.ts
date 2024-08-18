import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  createNewClass(classData: any){
    return this.http.post<any>(this.URL + '/classes/save', classData)
  }

  getClasses(){
    return this.http.get<any>(this.URL + '/classes/get')
  }

  deleteClass(id: String){
    return this.http.post<any>(this.URL + '/classes/delete', {id})
  }

  updateClass(classData: any){
    return this.http.post<any>(this.URL + '/classes/update', classData)
  }
}
