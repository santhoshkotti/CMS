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

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'formContract', component: FormContractComponent },
  { path: '', component: AppComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'options', component: GenericOptionsComponent },
  { path: 'users', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
