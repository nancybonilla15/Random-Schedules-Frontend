import { Router } from '@angular/router';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ClassesService } from '../../../services/Admin/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {
  class = {
    name: ''
  };

  showData = {
    _id: '',
    name: '',
  };

  classes: any = [];
  modalState: boolean = false;

  showModal(): Boolean {
    return this.modalState;
  }

  constructor(private classService: ClassesService, private router: Router) {
    classService.getClasses().subscribe(
      (res) => {
        console.log(res.classes);
        this.classes = res.classes;
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

    if(this.class.name != ''){
      this.classService.createNewClass(this.class).subscribe(
        (res) => {
          this.class = {
            name: ''
          };
          this.classService.getClasses().subscribe(
            (res) => {
              this.classes = res.classes;
            },
            (err) => console.log(err)
          );
          Swal.fire({
            title: 'Completado',
            text: res.response,
            icon: 'success',
            confirmButtonText: 'Listo',
          });
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
    }else{
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
      title: 'Seguro que quieres eliminar esta clase',
      showDenyButton: true,
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.classService.deleteClass(id).subscribe(
          (res) => {
            this.showData = {
              _id: '',
              name: ''
            };
            Swal.fire({
              title: 'Completado',
              text: res.response,
              icon: 'success',
              confirmButtonText: 'Listo',
            });
            this.classService.getClasses().subscribe(
              (res) => {
                this.classes = res.classes;
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
        Swal.fire('No se elimino la clase', '', 'info');
      }
    });
  }

  UpdateClass(id: any) {
    Swal.fire({
      title: 'Seguro que quieres actualizar esta clase',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Actualizar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.classService.updateClass(this.showData).subscribe(
          (res) => {
            this.showData = {
              _id: '',
              name: ''
            };
            Swal.fire({
              title: 'Completado',
              text: res.response,
              icon: 'success',
              confirmButtonText: 'Listo',
            });
            this.classService.getClasses().subscribe(
              (res) => {
                this.classes = res.classes;
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
        Swal.fire('Se cancelo la actualización de la clase', '', 'info');
      }
    });
  }
}
