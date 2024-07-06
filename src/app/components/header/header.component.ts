import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    contractTypes = [
      "Financial Contract",
      "Employee Agreement",
      "Buisness Contract",
      "ThirdParty Contract"
    ];
}
