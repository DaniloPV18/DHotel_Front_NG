import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pays } from '../../../../interfaces/pays';
import { PaysService } from '../../../../services/pays.service';

@Component({
  selector: 'app-pay-historic',
  templateUrl: './pay-historic.component.html',
  styleUrl: './pay-historic.component.css'
})
export class PayHistoricComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Pays>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8;
  }

  constructor(
    private _payService: PaysService,
    private _dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSource = new MatTableDataSource(this._payService.getAllPays());
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['huesped', 'encargado', 'habitacion', 'fecha_inicio', 'fecha_fin', 'fecha_registro', 'tipo_pago', 'accion'];

  /* seeDetails(element: Pays) {
    var text = "DETALLES DE PAGO";
    this._dialogRef.open(PayDetailsComponent, {
      width: '30%',
      data: {
        dataModal: element,
        dataText: text,
        dataStatus: 0
      }
    });
  } */
}
