import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CategoryComponent } from './components/category/category.component';
import { GenericOptionsComponent } from './components/generic-options/generic-options.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'options', component: GenericOptionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
