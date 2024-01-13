import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OptionsMainComponent } from './components/options-main/options-main.component';
import { AdministratorsListComponent } from './components/options-main/administrators/administrators-list/administrators-list.component';
import { PayListComponent } from './components/options-main/pay/pay-list/pay-list.component';
import { GuestsListComponent } from './components/options-main/guests/guests-list/guests-list.component';
import { ErrorPageComponent } from './templates/error-page/error-page.component';
import { RoomsListComponent } from './components/options-main/rooms/rooms-list/rooms-list.component';
import { ServicesListComponent } from './components/options-main/services/services-list/services-list.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "main", component: OptionsMainComponent },
  { path: "administrators", component: AdministratorsListComponent },
  { path: "pays", component: PayListComponent },
  { path: "guests", component: GuestsListComponent},
  { path: "rooms", component: RoomsListComponent},
  { path: "services", component: ServicesListComponent},
  { path: "404", component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
