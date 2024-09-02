import { ClassesService } from './../../../services/Admin/classes.service';
import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../services/Admin/masters.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubjectsService } from '../../../services/Admin/subjects.service';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrl: './masters.component.css',
})
export class MastersComponent {
  master = {
    name: '',
    identity: '',
    email: '',
    phone: '',
    password: 'random123',
    rank: 0,
  };

  showData = {
    _id: '',
    name: '',
    identity: '',
    email: '',
    phone: '',
    subjects: <string[]>[],
  };

  masters: any = [];
  subjects: any = [];
  modalState: boolean = false;

  masterSubjects: any = [];

  showModal(): Boolean {
    return this.modalState;
  }

  constructor(
    private masterService: MastersService,
    private router: Router,
    private subjectsService: SubjectsService
  ) {
    masterService.getMasters().subscribe(
      (res) => {
        this.masters = res.masters;
      },
      (err) => console.log(err)
    );

    subjectsService.getSubjects().subscribe(
      (res) => {
        this.subjects = res.subjects;
      },
      (err) => console.log(err)
    );
  }

  showMaster(masterData: any) {
    console.log(masterData);
    this.showData._id = masterData._id;
    this.showData.name = masterData.name;
    this.showData.identity = masterData.identity;
    this.showData.email = masterData.email;
    this.showData.phone = masterData.phone;
    this.showData.subjects = masterData.subjects;

    masterData.subjects.forEach((subject: string) => {
      this.masterSubjects.push(subject);
    });

    console.log(this.masterSubjects);

    this.modalState = true;
  }

  closeDetails() {
    this.masterSubjects = [];
    this.modalState = false;
  }

  appendSubject(subject: string) {
    if (this.masterSubjects.includes(subject)) {
      const removing = this.masterSubjects.indexOf(subject);

      if (removing > -1) {
        this.masterSubjects.splice(removing, 1);
      }
    } else {
      this.masterSubjects.push(subject);
    }
    console.log(this.masterSubjects);
  }

  UpdateSubjects(id: any) {
    Swal.fire({
      title: 'Seguro que quieres actualizar el listado de materias',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Actualizar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data: any = {
          _id: this.showData._id,
          subjects: this.masterSubjects,
        };
        this.masterService.updateSubject(data).subscribe(
          (res) => {
            this.showData = {
              _id: '',
              name: '',
              identity: '',
              email: '',
              phone: '',
              subjects: <string[]>[],
            };

            this.masterSubjects = [];
            Swal.fire({
              title: 'Completado',
              text: res.response,
              icon: 'success',
              confirmButtonText: 'Listo',
            });
            this.masterService.getMasters().subscribe(
              (res) => {
                this.masters = res.masters;
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
        Swal.fire('Se cancelo la actualización de usuario', '', 'info');
      }
    });
  }
}
