import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../../services/users.service';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from '../../../../interfaces/users';
import { UsersUpdateComponent } from '../../users/users-update/users-update.component';
import { UsersConfirmationComponent } from '../../users/users-confirmation/users-confirmation.component';
import { Service } from '../../../../interfaces/service';
import { ServiceService } from '../../../../services/service.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.css'
})
export class ServicesListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Service>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8;
  }

  constructor(
    private _serviceService: ServiceService,
    private _dialogRef: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this._serviceService.getAllServices());
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['id', 'nombre', 'codigo_servicio', 'id_personal_registro', 'fecha_registro', 'fecha_modificacion', 'id_estado', 'accion'];

  seeModal(element: Users) {
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
  }
}
