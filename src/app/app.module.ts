import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ParamsComponent } from './components/params/params.component';
import { TableComponent } from './components/table/table.component';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ContractviewComponent } from './components/contractview/contractview.component';
import { GenericOptionsComponent } from './components/generic-options/generic-options.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ParamsComponent,
    TableComponent,
    CategoryComponent,
    ContractviewComponent,
    FooterComponent,
    GenericOptionsComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
