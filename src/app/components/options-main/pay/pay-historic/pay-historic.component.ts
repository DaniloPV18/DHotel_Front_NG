import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReservesService } from '../../../../services/reserves.service';
import { Reserve } from '../../../../interfaces/reserve';
import { PayConfirmationComponent } from '../pay-confirmation/pay-confirmation.component';
import { ReserveCreateComponent } from '../reserve-create/reserve-create.component';

@Component({
  selector: 'app-pay-historic',
  templateUrl: './pay-historic.component.html',
  styleUrl: './pay-historic.component.css'
})
export class PayHistoricComponent implements AfterViewInit {

  estadoHistorico !: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Reserve>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8;
  }

  constructor(
    private _reservesService: ReservesService,
    private _dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSource = new MatTableDataSource<Reserve>;
    this.dataSource.paginator = this.paginator;
    this.estadoHistorico = this.data.dataModal.estadoId;
    if (this.data.dataModal.tipoPagoId == 2) {
      this.loadData(this.data.dataModal.id);
    }
  }

  displayedColumns: string[] = ['id', 'administrador', 'valor_pagado', 'fecha_registro', 'fecha_modificacion', 'estado', 'accion'];

  create() {
    this._dialogRef.open(ReserveCreateComponent, {
      width: '50%',
      data: {
        dataPayModal: this.data.dataModal
      }
    }).afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadData(this.data.dataModal.id);
      }
    });
  }

  statusEntity(elementReserve: Reserve) {
    var statusValue = elementReserve.estadoId === 1 ? 3 : 1;
    var text = "¿Está seguro que desea <b>ANULAR</b> el registro?";
    this._dialogRef.open(PayConfirmationComponent, {
      width: '30%',
      data: {
        dataReserveModal: elementReserve,
        dataPayModal: this.data.dataModal,
        dataText: text,
        dataStatus: statusValue
      }
    }).afterClosed().subscribe(result => {
      if (result === 'updated') {
        window.location.reload();
        this.estadoHistorico;
        this.loadData(this.data.dataModal.id);
      }
    });
  }

  loadData(idPago: number) {
    this._reservesService.getAllByIdPay(idPago).subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
