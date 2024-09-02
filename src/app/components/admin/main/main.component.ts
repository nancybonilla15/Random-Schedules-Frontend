import { StudentsService } from './../../../services/Admin/students.service';
import { ClassesService } from './../../../services/Admin/classes.service';
import { MastersService } from './../../../services/Admin/masters.service';
import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {


  mastersWithoutSubjests: any = []
  classesWithoutScheule: any = []
  

  constructor(private cookieService: CookieService, private masterService: MastersService, private classService: ClassesService, private studentsService: StudentsService){
    if(this.IsOperator()){
      masterService.getMasters().subscribe(
        (res) => {
          let result = res.masters
          result.forEach((element: any) => {
            if(element.subjects == undefined){
              if(element.subjects.length <= 0){
                this.mastersWithoutSubjests.push(element);
              }
            }else{
              if(element.subjects.length <= 0){
                this.mastersWithoutSubjests.push(element);
              }
            }
          });
        },
        (err) => console.error(err)
      );

      classService.getClasses().subscribe(
        (res) => {
          let result = res.classes
          result.forEach((element: any) => {
            if(element.hasScheule == undefined){
              if(!element.hasScheule){
                studentsService.countStudents(element._id).subscribe(
                  (res)=>{
                    let newObj = {
                      name: element.name,
                      students: res.students.length == undefined ? 0 : res.students.length,
                      description1:(element.hasScheule == undefined ? `* No se ha creado el horario de esta clase.` : ''),
                      description2:(res.students == undefined ? `* No se ha inscrito ningun estudiante.` : (res.students.length == 0 ? `* No se ha inscrito ningun estudiante.`: ''))
                    }
                    this.classesWithoutScheule.push(newObj);
                  },
                  (err)=> console.error(err)
                )
              }
            }else{
              if(!element.hasScheule){
                this.classesWithoutScheule.push(element);
              }
            }
          });
        },
        (err) => console.log(err)
      );

    }
  }

  IsAdmin(): Boolean{
    let res = false
    let userRank = this.cookieService.get('userPositionInSession')
    if(userRank.slice(-1) == '1'){
      res = true
    }
    return res
  }

  IsOperator(): Boolean{
    let res = false
    let userRank = this.cookieService.get('userPositionInSession')
    if(userRank.slice(-1) == '2'){
      res = true
    }
    return res
  }

  IsMaster(): Boolean{
    let res = false
    let userRank = this.cookieService.get('userPositionInSession')
    if(userRank.slice(-1) == '3'){
      res = true
    }
    return res
  }
}
