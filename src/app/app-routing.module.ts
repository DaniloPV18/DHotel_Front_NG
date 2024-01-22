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
import { AuthGuard } from './components/login/auth/auth-guard.service';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "main", component: OptionsMainComponent, canActivate: [AuthGuard] },
  { path: "administrators", component: AdministratorsListComponent, canActivate: [AuthGuard] },
  { path: "pays", component: PayListComponent, canActivate: [AuthGuard] },
  { path: "guests", component: GuestsListComponent, canActivate: [AuthGuard] },
  { path: "rooms", component: RoomsListComponent, canActivate: [AuthGuard] },
  { path: "services", component: ServicesListComponent, canActivate: [AuthGuard] },
  { path: "404", component: ErrorPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
