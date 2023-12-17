import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListComponent } from './components/options-main/users/users-list/users-list.component';
import { UsersCreateComponent } from './components/options-main/users/users-create/users-create.component';
import { OptionsMainComponent } from './components/options-main/options-main.component';
import { UsersUpdateComponent } from './components/options-main/users/users-update/users-update.component';
import { UsersConfirmationComponent } from './components/options-main/users/users-confirmation/users-confirmation.component';
import { PayListComponent } from './components/options-main/pay/pay-list/pay-list.component';
import { PayCreateComponent } from './components/options-main/pay/pay-create/pay-create.component';
import { PayUpdateComponent } from './components/options-main/pay/pay-update/pay-update.component';
import { PayConfirmationComponent } from './components/options-main/pay/pay-confirmation/pay-confirmation.component';
import { PayDetailsComponent } from './components/options-main/pay/pay-details/pay-details.component';
import { PayHistoricComponent } from './components/options-main/pay/pay-historic/pay-historic.component';
import { GuestsListComponent } from './components/options-main/guests/guests-list/guests-list.component';
import { ErrorPageComponent } from './templates/error-page/error-page.component';
import { RoomsListComponent } from './components/options-main/rooms/rooms-list/rooms-list.component';
import { ServicesListComponent } from './components/options-main/services/services-list/services-list.component';
import { RoomUpdateComponent } from './components/options-main/rooms/room-update/room-update.component';
import { RoomConfirmationComponent } from './components/options-main/rooms/room-confirmation/room-confirmation.component';
import { RoomCreateComponent } from './components/options-main/rooms/room-create/room-create.component';
import { GuestCreateComponent } from './components/options-main/guests/guest-create/guest-create.component';
import { GuestConfirmationComponent } from './components/options-main/guests/guest-confirmation/guest-confirmation.component';
import { GuestUpdateComponent } from './components/options-main/guests/guest-update/guest-update.component';
import { ServiceConfirmationComponent } from './components/options-main/services/service-confirmation/service-confirmation.component';
import { ServiceCreateComponent } from './components/options-main/services/service-create/service-create.component';
import { ServiceUpdateComponent } from './components/options-main/services/service-update/service-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    UsersListComponent,
    UsersCreateComponent,
    OptionsMainComponent,
    UsersUpdateComponent,
    UsersConfirmationComponent,
    PayListComponent,
    PayCreateComponent,
    PayUpdateComponent,
    PayConfirmationComponent,
    PayDetailsComponent,
    PayHistoricComponent,
    GuestsListComponent,
    ErrorPageComponent,
    RoomsListComponent,
    ServicesListComponent,
    RoomUpdateComponent,
    RoomConfirmationComponent,
    RoomCreateComponent,
    GuestCreateComponent,
    GuestConfirmationComponent,
    GuestUpdateComponent,
    ServiceConfirmationComponent,
    ServiceCreateComponent,
    ServiceUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    /* ANGULAR MATERIAL */
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
