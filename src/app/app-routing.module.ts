import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { FormContractComponent } from './components/form-contract/form-contract.component';
import { FooterComponent } from './components/footer/footer.component';


const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'layout', component: LayoutComponent},
  {path:'header',component:HeaderComponent},
  {path:'dashboard',component:DashBoardComponent},
  {path:'formContract',component:FormContractComponent},
  {path:'formContract/:contract',component:FormContractComponent},
  {path:'footer',component:FooterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
