import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OptionsMainComponent } from './components/options-main/options-main.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "main", component: OptionsMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
