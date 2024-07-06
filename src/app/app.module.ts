import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ParamsComponent } from './components/params/params.component';
import { TableComponent } from './components/table/table.component';
import { CategoryComponent } from './components/category/category.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContractviewComponent } from './components/contractview/contractview.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterContractPipe } from './filter-contract.pipe';
import { FormContractComponent } from './components/form-contract/form-contract.component';


import { GenericOptionsComponent } from './components/generic-options/generic-options.component';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  imports: [BrowserModule,HttpClientModule, AppRoutingModule,FormsModule,ReactiveFormsModule],
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    ParamsComponent,
    TableComponent,
    CategoryComponent,
    ContractviewComponent,FormContractComponent,DashBoardComponent,FilterContractPipe,
    FooterComponent,
    GenericOptionsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
