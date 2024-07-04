import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css']
})
export class ParamsComponent {
  params: string[] = [
    'category',
    'description',
    'group',
    'done_outline',
    'title',
    'timer',
    'person_add',
  ];
  names:string[] = ['category','form','user','status','types','limitset','role']

  constructor(private router: Router) {}

  navigateToComponent(item: string) {
    this.router.navigate([`/${item}`]);
  }


}
