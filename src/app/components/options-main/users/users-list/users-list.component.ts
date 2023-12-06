import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../../services/users.service';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from '../../../../interfaces/users';
import { UsersUpdateComponent } from '../users-update/users-update.component';
import { UsersConfirmationComponent } from '../users-confirmation/users-confirmation.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Users>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 8;
  }

  constructor(
    private _userService: UsersService,
    private _dialogRef: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this._userService.getAllUsers());
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'email', 'ultima_actividad', 'genero', 'rol', 'accion'];

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
