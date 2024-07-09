import { Component, Input } from '@angular/core';
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
  ];
  // params: string[] = [
  //   'category',
  //   'description',
  //   'group',
  //   'done_outline',
  //   'title',
  //   'timer',
  //   'person_add',
  // ];
  //names:string[] = ['category','form','user','status','types','limitset','role']
  //names:string[] = ['Category','Forms','user','Status','types','ExpirationLimit','Role']
  names: string[] = [
    'Category',
    'Forms',
    'Status',
    'ExpirationLimit',
    'Role',
    'Permissions',
    'Users',
  ];

  constructor(private router: Router) {}

  // navigateToComponent(item: string) {
  //   this.router.navigate([`/${item}`]);
  // }
  navigateToComponent(item: string) {
    if (item !== 'Users') {
      this.router.navigate(['/options'], { queryParams: { key: item } });
    } else{
      this.router.navigate(['/users']);
    }
  }
}
