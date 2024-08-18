import { UsersService } from './../../../services/Admin/users.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  user = {
    name: '',
    identity: '',
    email: '',
    phone: '',
    password: 'random123',
    rank: 0,
  };

  showData = {
    _id: '',
    name: 'Ranga',
    identity: '',
    email: '',
    phone: '',
    rank: 1,
  };

  users: any = [];
  modalState: boolean = false;

  showModal(): Boolean {
    return this.modalState;
  }

  constructor(private userService: UsersService, private router: Router) {
    userService.getUsers().subscribe(
      (res) => {
        // console.log(res.users);
        this.users = res.users;
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
    this.showData.rank = masterData.rank;
    this.modalState = true;
  }

  closeDetails() {
    this.modalState = false;
  }

  RegisterNewUser() {
    if(this.user.name != '' && this.user.identity != '' && this.user.email != '' && this.user.phone != '' && this.user.rank != 0){
      this.userService.createNewUser(this.user).subscribe(
        (res) => {
          this.user = {
            name: '',
            identity: '',
            email: '',
            phone: '',
            password: 'random123',
            rank: 0,
          };
          this.userService.getUsers().subscribe(
            (res) => {
              console.log(res.users);
              this.users = res.users;
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
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Se deben llenar todos los campos solicitados',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
    }
  }

  DeleteUser(id: any) {
    Swal.fire({
      title: 'Seguro que quieres eliminar este usuario',
      showDenyButton: true,
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (res) => {
            this.showData = {
              _id: '',
              name: '',
              identity: '',
              email: '',
              phone: '',
              rank: 1,
            };
            Swal.fire({
              title: 'Completado',
              text: res.response,
              icon: 'success',
              confirmButtonText: 'Listo',
            });
            this.userService.getUsers().subscribe(
              (res) => {
                this.users = res.users;
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
        Swal.fire('No se elimino al usuario', '', 'info');
      }
    });
  }

  UpdateUser(id: any) {
    Swal.fire({
      title: 'Seguro que quieres actualizar este usuario',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Actualizar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUser(this.showData).subscribe(
          (res) => {
            this.showData = {
              _id: '',
              name: '',
              identity: '',
              email: '',
              phone: '',
              rank: 1,
            };
            Swal.fire({
              title: 'Completado',
              text: res.response,
              icon: 'success',
              confirmButtonText: 'Listo',
            });
            this.userService.getUsers().subscribe(
              (res) => {
                this.users = res.users;
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
