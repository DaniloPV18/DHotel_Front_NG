import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AdministratorsService } from '../../../../services/administrators.service';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Administrators } from '../../../../interfaces/administrators';
import { AdministratorsUpdateComponent } from '../administrators-update/administrators-update.component';
import { AdministratorsConfirmationComponent } from '../administrators-confirmation/administrators-confirmation.component';

@Component({
  selector: 'app-administrators-list',
  templateUrl: './administrators-list.component.html',
  styleUrl: './administrators-list.component.css'
})
export class AdministratorsListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Administrators>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8;
  }

  constructor(
    private _administratorsService: AdministratorsService,
    private _dialogRef: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Administrators>();
    this._administratorsService.getAllUsers().subscribe(data => {
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'email', 'ultima_actividad', 'genero', 'rol', 'accion'];

  seeModal(element: Administrators) {
    this._dialogRef.open(AdministratorsUpdateComponent, {
      width: '30%',
      data: {
        dataModal: element
      }
    });
  }

  deleteEntity(element: Administrators) {
    var text = "¿Está seguro que desea <b>desactivar</b> la cuenta?";
    this._dialogRef.open(AdministratorsConfirmationComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 0
      }
    });
  }

  activateEntity(element: Administrators) {
    var text = "¿Está seguro que desea <b>activar</b> la cuenta?";
    this._dialogRef.open(AdministratorsConfirmationComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 1
      }
    });
  }

  roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Operador' }
  ];
}
