import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AdministratorsService } from '../../../../services/administrators.service';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.css'
})
export class ServicesListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /* dataSource: MatTableDataSource<Users>; */

  ngAfterViewInit() {
    /* this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8; */
  }

  constructor(
    private _userService: AdministratorsService,
    private _dialogRef: MatDialog
  ) {
    /* this.dataSource = new MatTableDataSource(this._userService.getAllUsers());
    this.dataSource.paginator = this.paginator; */
  }

  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'email', 'ultima_actividad', 'genero', 'rol', 'accion'];

  /* seeModal(element: Users) {
    this._dialogRef.open(UsersUpdateComponent, {
      width: '30%',
      data: {
        dataModal: element
      }
    });
  }

  deleteEntity(element: Users) {
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

  activateEntity(element: Users) {
    var text = "¿Está seguro que desea <b>activar</b> la cuenta?";
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
