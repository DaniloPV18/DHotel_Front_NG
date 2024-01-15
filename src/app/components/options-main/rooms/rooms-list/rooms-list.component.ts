import { Component, AfterViewInit, ViewChild } from '@angular/core';
/* import { UsersService } from '../../../../services/administrators.service'; */

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdministratorsService } from '../../../../services/administrators.service';
import { Rooms } from '../../../../interfaces/rooms';
import { RoomCreateComponent } from '../room-create/room-create.component';
import { RoomUpdateComponent } from '../room-update/room-update.component';
import { RoomConfirmationComponent } from '../room-confirmation/room-confirmation.component';
import { RoomsService } from '../../../../services/rooms.service';
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
  dataSource: MatTableDataSource<Rooms>;

  ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.paginator.pageSize = 8;
  }

  constructor(
    private _roomService: RoomsService,
    private _dialogRef: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Rooms>();
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['numero', 'tipo_habitacion', 'fecha_registro', 'fecha_modificacion', 'precio', 'accion'];

  create() {
    var text = "REGISTRAR NUEVA HABITACION";
    this._dialogRef.open(RoomCreateComponent, {
      width: '60%',
      data: {
        dataText: text
      }
    }).afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadData();
      }
    });
  }

  seeModal(element: Rooms) {
    this._dialogRef.open(RoomUpdateComponent, {
      width: '30%',
      data: {
        dataModal: element
      }
    }).afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadData();
      }
    });
  }

  statusEntity(element: Rooms) {
    var statusText = element.estadoId === 1 ? "desactivar" : "activar";
    var statusValue = element.estadoId === 1 ? 0 : 1;
    var text = `¿Está seguro que desea <b>${statusText}</b> la cuenta?`;
    this._dialogRef.open(RoomConfirmationComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: statusValue
      }
    }).afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadData();
      }
    });
  }

  loadData() {
    this._roomService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

}
