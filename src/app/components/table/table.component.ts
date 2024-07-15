import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Options } from 'src/app/interfaces/options';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  // @Input() rows: any[] = [];
  // @Output() editItem = new EventEmitter<{ id: number; value: string }>();
  // @Output() deleteItem = new EventEmitter< {id:number}>();

  // constructor() {
  //   console.log("in table constructor", this.rows);
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['rows']) {
  //     console.log("rows changed in table", this.rows);
  //   }
  // }

  // onEdit(item: number,value:string) {
  //   this.editItem.emit({id:item,value:value});
  //   console.log("in tab "+item)
  // }
  // onDelete(item: number) {
  //   this.deleteItem.emit({id:item});
  //   console.log("in tab "+item)
  // }
  // addCategory(newCategory: string) {
  //   if (newCategory && !this.rows.includes(newCategory)) {
  //     this.rows.push(newCategory);
  //   }
  // }
}
