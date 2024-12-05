import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @ViewChild('modal') modal!: ElementRef;
  ngOnInit(){
  }
  show=false;
  set(){
   this.show=true;
  }
}
