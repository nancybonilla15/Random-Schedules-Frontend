import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ClassesService } from '../../../services/Admin/classes.service';
import { Router } from '@angular/router';
import { SubjectsService } from '../../../services/Admin/subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css',
})
export class SubjectsComponent {
  subject = {
    name: '',
  };

  showData = {
    _id: '',
    name: '',
  };

  subjects: any = [];
  modalState: boolean = false;

  showModal(): Boolean {
    return this.modalState;
  }

  constructor(private subjectService: SubjectsService, private router: Router) {
    subjectService.getSubjects().subscribe(
      (res) => {
        console.log(res.subjects);
        this.subjects = res.subjects;
      },
      (err) => console.log(err)
    );
  }

  showClass(masterData: any) {
    console.log(masterData);
    this.showData._id = masterData._id;
    this.showData.name = masterData.name;
    this.modalState = true;
  }

  closeDetails() {
    this.modalState = false;
  }

  RegisterNewClass() {
    if (this.subject.name != '') {
      this.subjectService.createNewSubject(this.subject).subscribe(
        (res) => {
          this.subject = {
            name: '',
          };
          this.subjectService.getSubjects().subscribe(
            (res) => {
              this.subjects = res.subjects;
            },
            (err) => console.log(err)
          );
          Swal.fire({
            title: 'Completado',
            text: res.response,
            icon: 'success',
            confirmButtonText: 'Listo',
          });
          console.log(res);
        },
        (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.response,
            icon: 'warning',
            confirmButtonText: 'Listo',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Se deben llenar todos los campos solicitados',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
    }
  }

  DeleteClass(id: any) {
    Swal.fire({
      title: 'Seguro que quieres eliminar esta asignatura',
      showDenyButton: true,
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectService.deleteSubject(id).subscribe(
          (res) => {
            this.showData = {
              _id: '',
              name: '',
            };
            Swal.fire({
              title: 'Completado',
              text: res.response,
              icon: 'success',
              confirmButtonText: 'Listo',
            });
            this.subjectService.getSubjects().subscribe(
              (res) => {
                this.subjects = res.subjects;
              },
              (err) => console.log(err)
            );
            this.closeDetails();
          },
          (err) => {
            Swal.fire({
              title: 'Error',
              text: err.error.response,
              icon: 'warning',
              confirmButtonText: 'Listo',
            });
          }
        );
      } else if (result.isDenied) {
        Swal.fire('No se elimino la asignatura', '', 'info');
      }
    });
  }

  UpdateClass(id: any) {
    Swal.fire({
      title: 'Seguro que quieres actualizar esta asignatura',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Actualizar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectService.updateSubject(this.showData).subscribe(
          (res) => {
            this.showData = {
              _id: '',
              name: '',
            };
            Swal.fire({
              title: 'Completado',
              text: res.response,
              icon: 'success',
              confirmButtonText: 'Listo',
            });
            this.subjectService.getSubjects().subscribe(
              (res) => {
                this.subjects = res.subjects;
              },
              (err) => console.log(err)
            );
            this.closeDetails();
          },
          (err) => {
            Swal.fire({
              title: 'Error',
              text: err.error.response,
              icon: 'warning',
              confirmButtonText: 'Listo',
            });
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Se cancelo la actualización de la asignatura', '', 'info');
      }
    });
  }
}
