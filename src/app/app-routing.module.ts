import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OptionsMainComponent } from './components/options-main/options-main.component';
import { UsersListComponent } from './components/options-main/users/users-list/users-list.component';
import { PayListComponent } from './components/options-main/pay/pay-list/pay-list.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "main", component: OptionsMainComponent },
  { path: "users", component: UsersListComponent },
  { path: "pays", component: PayListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
