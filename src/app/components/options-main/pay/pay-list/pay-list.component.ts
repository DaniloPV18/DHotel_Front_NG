import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Pays } from '../../../../interfaces/pays';
import { PaysService } from '../../../../services/pays.service';
import { PayDetailsComponent } from '../pay-details/pay-details.component';
import { PayConfirmationComponent } from '../pay-confirmation/pay-confirmation.component';
import { PayCreateComponent } from '../pay-create/pay-create.component';

@Component({
  selector: 'app-pay-list',
  templateUrl: './pay-list.component.html',
  styleUrl: './pay-list.component.css'
})
export class PayListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Pays>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8;
  }

  constructor(
    private _payService: PaysService,
    private _dialogRef: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this._payService.getAllPays());
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['huesped', 'encargado', 'habitacion', 'fecha_inicio', 'fecha_fin', 'fecha_registro', 'tipo_pago', 'accion'];

  seeDetails(element: Pays) {
    var text = "DETALLES DE PAGO";
    this._dialogRef.open(PayDetailsComponent, {
      width: '40%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 0
      }
    });
  }

  create(status: number) {
    var text = "";
    switch (status) {
      case 1:
        text = "REGISTRAR PAGO DIRECTO";
        break;
      case 2:
        text = "REGISTRAR RESERVA";
        break;
    }
    this._dialogRef.open(PayCreateComponent, {
      width: '25%',
      data: {
        dataText: text,
        dataStatus: status
      }
    });
  }

  deleteElement(element: Pays) {
    var text = "¿ESTÁ SEGURO QUE DESEA <b>ANULAR</b> EL REGISTRO?";
    this._dialogRef.open(PayConfirmationComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 0
      }
    });
  }
}
