import { HttpClient } from '@angular/common/http';

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
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';
import {MatCheckboxChange} from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { MainComponent } from './components/main/main.component';
import { Router } from '@angular/router';
import { Routes } from '@angular/router';



import { GenericOptionsComponent } from './components/generic-options/generic-options.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
@NgModule({

  imports: [BrowserModule, AppRoutingModule,FormsModule,ReactiveFormsModule,RouterModule,HttpClientModule, BrowserAnimationsModule
    ,MatTableModule,
     MatSortModule,
     MatPaginatorModule,
     CdkDrag,
     CdkDropList,
     MatFormFieldModule,
     MatInputModule,
     MatSelectModule,
     MatOptionModule,
     MatCheckboxModule,
     MatMenuModule,
     NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    ParamsComponent,
    TableComponent,
    CategoryComponent,
    ContractviewComponent,
    FormContractComponent,
    DashBoardComponent,
    FilterContractPipe,
    FooterComponent,
    GenericOptionsComponent,
    UserComponent,
   MainComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
