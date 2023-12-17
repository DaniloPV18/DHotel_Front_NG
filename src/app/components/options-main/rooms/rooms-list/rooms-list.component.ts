import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../../services/users.service';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from '../../../../interfaces/users';
import { UsersUpdateComponent } from '../../users/users-update/users-update.component';
import { UsersConfirmationComponent } from '../../users/users-confirmation/users-confirmation.component';
import { RoomsService } from '../../../../services/rooms.service';
import { Rooms } from '../../../../interfaces/rooms';
import { RoomUpdateComponent } from '../room-update/room-update.component';
@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css'
})
export class RoomsListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Rooms>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8;
  }

  constructor(
    private _roomService: RoomsService,
    private _dialogRef: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this._roomService.getAllRooms());
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['id', 'numero', 'id_tipo_habitacion', 'id_personal_registro', 'fecha_registro', 'fecha_modificacion', 'id_estado', 'precio', 'foto_ruta', 'accion'];

  seeModal(element: Rooms) {
    this._dialogRef.open(RoomUpdateComponent, {
      width: '30%',
      data: {
        dataModal: element
      }
    });
  }

  deleteEntity(element: Rooms) {
    var text = "¿Está seguro que desea <b>desactivar</b> la cuenta?";
    this._dialogRef.open(UsersConfirmationComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 0
      }
    });
  }

  activateEntity(element: Rooms) {
    var text = "¿Está seguro que desea <b>activar</b> la cuenta?";
    this._dialogRef.open(UsersConfirmationComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 1
      }
    });
  }

}
