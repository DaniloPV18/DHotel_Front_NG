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

  displayedColumns: string[] = ['id', 'nombre', 'codigo_servicio', 'id_personal_registro', 'fecha_registro', 'fecha_modificacion', 'id_estado', 'accion'];

  /* seeModal(element: Users) {
    this._dialogRef.open(UsersUpdateComponent, {
      width: '30%',
      data: {
        dataModal: element
      }
    });
  }

  deleteEntity(element: Service) {
    var text = "¿Está seguro que desea <b>desactivar</b> el servicio?";
    this._dialogRef.open(ServiceConfirmationComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 0
      }
    });
  }

  activateEntity(element: Service) {
    var text = "¿Está seguro que desea <b>activar</b> el servicio?";
    this._dialogRef.open(ServiceConfirmationComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 1
      }
    });
  } */
}
