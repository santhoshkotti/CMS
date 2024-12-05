import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { FormContractComponent } from './components/form-contract/form-contract.component';
import { CategoryComponent } from './components/category/category.component';
import { GenericOptionsComponent } from './components/generic-options/generic-options.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { ContractviewComponent } from './components/contractview/contractview.component';
import { FooterComponent } from './components/footer/footer.component';
import { ParamsComponent } from './components/params/params.component';

const routes: Routes = [
  { path: '', component: DashBoardComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'formContract', component: FormContractComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'options', component: GenericOptionsComponent },
  { path: 'users', component: UserComponent },
  { path: 'contractview', component: ContractviewComponent },
  { path: 'params', component: ParamsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
