import { Injectable } from '@angular/core';
import { GuestCreateComponent } from '../../components/options-main/guests/guest-create/guest-create.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestComponentsService {

  constructor(private dialogRef: MatDialog) { }

  openCreateGuestDialog(): Observable<any> {
    var text = " ";
    return this.dialogRef.open(GuestCreateComponent, {
      width: '40%',
      data: { dataText: text }
    }).afterClosed();
  }
}
