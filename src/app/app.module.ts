import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ContractviewComponent } from './components/contractview/contractview.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterContractPipe } from './filter-contract.pipe';
import { FormContractComponent } from './components/form-contract/form-contract.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LayoutComponent,FormContractComponent,DashBoardComponent,FilterContractPipe],
  imports: [BrowserModule, AppRoutingModule,FormsModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
