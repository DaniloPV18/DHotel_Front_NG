import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GuestsService } from '../../../../services/guests.service';
import { Guests } from '../../../../interfaces/guests';
import { UsersConfirmationComponent } from '../../users/users-confirmation/users-confirmation.component';
import { UsersUpdateComponent } from '../../users/users-update/users-update.component';

@Component({
  selector: 'app-guests-list',
  templateUrl: './guests-list.component.html',
  styleUrl: './guests-list.component.css'
})
export class GuestsListComponent implements AfterViewInit  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Guests>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8;
  }

  constructor(
    private _userService: GuestsService,
    private _dialogRef: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this._userService.getAllGuests());
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'celular', 'genero', 'registrado', 'fecha_registro', 'fecha_modificacion', 'accion'];

  seeModal(element: Guests) {
    this._dialogRef.open(UsersUpdateComponent, {
      width: '30%',
      data: {
        dataModal: element
      }
    });
  }

  deleteEntity(element: Guests) {
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

  activateEntity(element: Guests) {
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
