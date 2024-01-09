import { Component, AfterViewInit, ViewChild } from '@angular/core';
/* import { UsersService } from '../../../../services/administrators.service'; */

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdministratorsService } from '../../../../services/administrators.service';
/* import { Users } from '../../../../interfaces/administrators';
import { UsersUpdateComponent } from '../../users/administrators-update/administrators-update.component';
import { UsersConfirmationComponent } from '../../users/administrators-confirmation/administrators-confirmation.component'; */
@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css'
})
export class RoomsListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /* dataSource: MatTableDataSource<Users>; */

  ngAfterViewInit() {
   /*  this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8; */
  }

  constructor(
    private _userService: AdministratorsService,
    private _dialogRef: MatDialog
  ) {
    /* this.dataSource = new MatTableDataSource(this._userService.getAllUsers());
    this.dataSource.paginator = this.paginator; */
  }

  /* displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'email', 'ultima_actividad', 'genero', 'rol', 'accion'];

  seeModal(element: Rooms) {
    this._dialogRef.open(RoomUpdateComponent, {
      width: '30%',
      data: {
        dataModal: element
      }
    });
  }

  createRoom(){
    this._dialogRef.open(RoomCreateComponent, {
      width: '30%',
      data: {
        dataModel: "test"
      }
    });
  }

  deleteEntity(element: Rooms) {
    var text = "¿Está seguro que desea <b>desactivar</b> la habitación?";
    this._dialogRef.open(RoomConfirmationComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 0
      }
    });
  }

  activateEntity(element: Rooms) {
    var text = "¿Está seguro que desea <b>activar</b> la habitación?";
    this._dialogRef.open(UsersConfirmationComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 1
      }
    });
  } */

}
