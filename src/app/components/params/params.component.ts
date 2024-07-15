import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css'],
})
export class ParamsComponent {
  params: string[] = [
    'category',
    'description',
    'done_outline',
    'timer',
    'manage_accounts',
    'security',
    'person_add',
    'additionalfield', // Add the new field here
  ];

  names: string[] = [
    'Category',
    'Forms',
    'Status',
    'ExpirationLimit',
    'Role',
    'Permissions',
    'Users',
    'AdditionalField', // Add the new field here
  ];

  constructor(private router: Router) {}

  navigateToComponent(item: string) {
    if (item === 'Users') {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate(['/options'], { queryParams: { key: item } });
    }
  }
}

// navigateToComponent(item: string) {
//   this.router.navigate([`/${item}`]);
// }
