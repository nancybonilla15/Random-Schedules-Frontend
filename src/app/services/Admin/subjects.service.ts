import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  createNewSubject(classData: any){
    return this.http.post<any>(this.URL + '/subjects/save', classData)
  }

  getSubjects(){
    return this.http.get<any>(this.URL + '/subjects/get')
  }

  deleteSubject(id: String){
    return this.http.post<any>(this.URL + '/subjects/delete', {id})
  }

  updateSubject(classData: any){
    return this.http.post<any>(this.URL + '/subjects/update', classData)
  }
}
