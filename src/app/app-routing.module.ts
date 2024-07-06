import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { FormContractComponent } from './components/form-contract/form-contract.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'layout', component: LayoutComponent},
  {path:'header',component:HeaderComponent},
  {path:'dashboard',component:DashBoardComponent},
  {path:'formContract',component:FormContractComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
