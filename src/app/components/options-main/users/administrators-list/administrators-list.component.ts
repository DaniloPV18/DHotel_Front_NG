import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AdministratorsService } from '../../../../services/administrators.service';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Administrators } from '../../../../interfaces/administrators';
import { AdministratorsUpdateComponent } from '../administrators-update/administrators-update.component';
import { AdministratorsConfirmationComponent } from '../administrators-confirmation/administrators-confirmation.component';
import { AdministratorsCreateComponent } from '../administrators-create/administrators-create.component';

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
    this._administratorsService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'email', 'ultima_actividad', 'genero', 'rol', 'accion'];

  create() {
    var text = " ";
    this._dialogRef.open(AdministratorsCreateComponent, {
      width: '40%',
      data: {
        dataText: text
      }
    }).afterClosed().subscribe(result => {
      debugger;
      if (result === 'updated') {        
        this.loadData();
      }
    });
  }

  seeModal(element: Administrators) {
    this._dialogRef.open(AdministratorsUpdateComponent, {
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

  statusEntity(element: Administrators) {
    var statusText = element.estadoId === 1 ? "desactivar" : "activar";
    var statusValue = element.estadoId === 1 ? 0 : 1;
    var text = `¿Está seguro que desea <b>${statusText}</b> la cuenta?`;
    this._dialogRef.open(AdministratorsConfirmationComponent, {
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
    this._administratorsService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
