import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsersConfirmationComponent } from '../../users/users-confirmation/users-confirmation.component';
import { RoomsService } from '../../../../services/rooms.service';
import { Rooms } from '../../../../interfaces/rooms';
import { RoomUpdateComponent } from '../room-update/room-update.component';
import { RoomConfirmationComponent } from '../room-confirmation/room-confirmation.component';
import { RoomCreateComponent } from '../room-create/room-create.component';
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
  }

}
