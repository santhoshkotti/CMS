import { NgModule } from '@angular/core';
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

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'formcontract', component: FormContractComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'options', component: GenericOptionsComponent },
  { path: 'users', component: UserComponent },
  { path: 'contractview', component: ContractviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
