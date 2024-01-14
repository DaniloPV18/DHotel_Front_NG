import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GuestsService } from '../../../../services/guests.service';
import { Guests } from '../../../../interfaces/guests';
import { GuestCreateComponent } from '../guest-create/guest-create.component';
import { GuestUpdateComponent } from '../guest-update/guest-update.component';

@Component({
  selector: 'app-guests-list',
  templateUrl: './guests-list.component.html',
  styleUrl: './guests-list.component.css'
})
export class GuestsListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Guests>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8;
  }

  constructor(
    private _guestService: GuestsService,
    private _dialogRef: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Guests>()
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'email', 'celular', 'genero', 'fecha_registro', 'fecha_modificacion', 'accion'];

  create() {
    var text = " ";
    this._dialogRef.open(GuestCreateComponent, {
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

  seeModal(element: Guests) {
    this._dialogRef.open(GuestUpdateComponent, {
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

  loadData() {
    this._guestService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
