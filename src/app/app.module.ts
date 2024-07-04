import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContractviewComponent } from './components/contractview/contractview.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LayoutComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
