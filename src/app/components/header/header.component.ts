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
