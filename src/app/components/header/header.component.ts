import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  contractTypes = [
    'Financial Contract',
    'Employee Agreement',
    'Business Contract',
    'ThirdParty Contract',
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    initFlowbite();
  }

  navigateToFormContract(category: string): void {
    this.router.navigate(['/formcontract'], {
      queryParams: { contractType: category },
    });
  }
}
// import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { initFlowbite } from 'flowbite';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent {

//   @ViewChild('modal') modal!: ElementRef;

//   isModalOpen!:boolean;
//   ngOnInit(){
//   //  this.isModalOpen=true;
//   }



//     contractTypes = [
//       "Financial Contract",
//       "Employee Agreement",
//       "Buisness Contract",
//       "ThirdParty Contract"
//     ];

//     // closeModal(): void {
//     //   this.isModalOpen=false;

//     // }
//     navigateToFormContract(category: string): void {
//       this.router.navigate(['/formcontract'], {
//         queryParams: { contractType: category },
//       });
//     }
// }
