import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CategoryComponent } from './components/category/category.component';
import { FormComponent } from './components/form/form.component';
import { TypesComponent } from './components/types/types.component';
import { StatusComponent } from './components/status/status.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'form', component: FormComponent },
  { path: 'types', component: TypesComponent },
  { path: 'status', component: StatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
