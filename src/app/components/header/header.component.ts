import { Component, ElementRef, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('modal') modal!: ElementRef;

  isModalOpen!:boolean;
  ngOnInit(){
  //  this.isModalOpen=true;
  }



    contractTypes = [
      "Financial Contract",
      "Employee Agreement",
      "Buisness Contract",
      "ThirdParty Contract"
    ];

    // closeModal(): void {
    //   this.isModalOpen=false;

    // }
}
