import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() rows: string[] = [];
  //rows :string[] = ['finance','employement','third-party','business'];

  constructor(){
    console.log(this.rows)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['rows']) {
      console.log(this.rows)
    }
  }

  // addCategory(newCategory: string) {
  //   if (newCategory && !this.rows.includes(newCategory)) {
  //     this.rows.push(newCategory);
  //   }
  // }
}
