import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AdministratorsService } from '../../../../services/administrators.service';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Service } from '../../../../interfaces/service';
import { ServiceService } from '../../../../services/service.service';
import { ServiceUpdateComponent } from '../service-update/service-update.component';
import { ServiceConfirmationComponent } from '../service-confirmation/service-confirmation.component';
import { ServiceCreateComponent } from '../service-create/service-create.component';

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
    private __serviceService: ServiceService,
    private _dialogRef: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Service>();
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['codigo','nombre', 'fecha_registro', 'fecha_modificacion', 'estado', 'accion'];

  create() {
    var text = " ";
    this._dialogRef.open(ServiceCreateComponent, {
      width: '40%',
      data: {
        dataText: text
      }
    }).afterClosed().subscribe(result => {
      if (result === 'updated') {        
        this.loadData();
      }
    });
  }

  seeModal(element: Service) {
    this._dialogRef.open(ServiceUpdateComponent, {
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

  statusEntity(element: Service) {
    var statusText = element.estadoId === 1 ? "desactivar" : "activar";
    var statusValue = element.estadoId === 1 ? 0 : 1;
    var text = `¿Está seguro que desea <b>${statusText}</b> el servicio?`;
    this._dialogRef.open(ServiceConfirmationComponent, {
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
    this.__serviceService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
