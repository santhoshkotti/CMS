// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { FieldsIn } from 'src/app/interfaces/options';
// import { ConnectService } from 'src/app/services/connect/connect.service';

// @Component({
//   selector: 'app-additional-fields',
//   templateUrl: './additional-fields.component.html',
//   styleUrls: ['./additional-fields.component.css'],
// })
// export class AdditionalFieldsComponent {
//   @Input() key: string = '';
//   @Input() CategoryId: number = 0;
//   @Input() SelectedField: any[] = [];
//   @Input() IsEdit: boolean = false;
//   @Output() fieldsSelected = new EventEmitter<FieldsIn[]>();
//   @Output() eventToggle = new EventEmitter<boolean>();
//   @Output() selectedAdditionalFields = new EventEmitter<any[]>();

//   additionalFields: any[] = [];
//   selectedFields: FieldsIn[] = [];
//   showFields: boolean = false;

//   constructor(private genericService: ConnectService) {}

//   ngOnInit(): void {
//     if (this.key) {
//       this.genericService.getAdditionalFields().subscribe((fields) => {
//         this.additionalFields = fields.filter(
//           (field) => field.Key === 'AdditionalField'
//         );
//         console.log('additionalFields', this.additionalFields);
//       });
//     }
//   }

//   toggleFields(event: any): void {
//     this.showFields = event.target.checked;
//     this.eventToggle.emit(this.showFields);
//     if (this.SelectedField != null) {
//       this.selectedFields = [...this.SelectedField];
//     }
//   }

//   onFieldChange(event: any, field: any): void {
//     if (event.target.checked) {
//       this.selectedFields = [...this.selectedFields, field.Id];
//     } else {
//       this.selectedFields = this.selectedFields.filter((f) => f !== field.Id);
//     }
//     console.log('selectedFields', this.selectedFields);
//     console.log('SelectedField', this.SelectedField);
//   }

//   addFieldsToCategory(): void {
//     this.fieldsSelected.emit(this.selectedFields);
//     this.selectedFields = []; // Clear selected fields after emitting
//     this.showFields = false;
//     this.eventToggle.emit(this.showFields);
//   }

//   EditCategoryField(): void {
//     this.selectedAdditionalFields.emit(this.selectedFields);
//     this.showFields = false;
//     this.eventToggle.emit(this.showFields);
//   }
// }
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ConnectService } from 'src/app/services/connect/connect.service';

@Component({
  selector: 'app-additional-fields',
  templateUrl: './additional-fields.component.html',
  styleUrls: ['./additional-fields.component.css'],
})
export class AdditionalFieldsComponent implements OnInit {
  @Input() key: string = '';
  @Input() CategoryId: number = 0;
  @Input() SelectedField: any[] = [];
  @Input() IsEdit: boolean = false;
  @Output() fieldsSelected = new EventEmitter<any[]>();
  @Output() eventToggle = new EventEmitter<boolean>();
  @Output() selectedAdditionalFields = new EventEmitter<any[]>();

  additionalFields: any[] = [];
  selectedFields: any[] = [];
  showFields: boolean = false;
  showDropdown: boolean = false;
  filteredItems: any[] = [];
  inputValue: string = '';

  constructor(private genericService: ConnectService) {}

  ngOnInit(): void {
    if (this.key) {
      this.genericService.getAdditionalFields().subscribe((fields) => {
        this.additionalFields = fields
          .filter((field) => field.Key === 'AdditionalField')
          .map((field) => ({
            id: field.Id,
            Value: field.Value,
          }));
        this.filteredItems = [...this.additionalFields];
        console.log(this.filteredItems);
      });
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputValue = input?.value || '';
    this.showDropdown = true;
    if (this.inputValue) {
      this.filteredItems = this.additionalFields.filter((item) =>
        item.name.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    } else {
      this.filteredItems = [...this.additionalFields];
    }
  }

  addTag(): void {
    const item = this.filteredItems.find(
      (i) => i.name.toLowerCase() === this.inputValue.toLowerCase()
    );
    if (item && !this.selectedFields.some((f) => f.id === item.id)) {
      this.selectedFields.push(item);
      this.inputValue = '';
      this.filteredItems = [...this.additionalFields];
      this.showDropdown = false;
    }
  }

  removeTag(tag: any): void {
    console.log(this.selectedFields);
    this.selectedFields = this.selectedFields.filter(
      (field) => field.id !== tag.id
    );
    console.log('after removal ', this.selectedFields);
  }

  removeLastTag(event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.inputValue) {
      this.selectedFields.pop();
    }
  }

  selectItem(item: any): void {
    if (!this.selectedFields.some((f) => f.id === item.id)) {
      this.selectedFields.push(item);
      this.inputValue = '';
      this.showDropdown = false;
    }
  }

  addFieldsToCategory(): void {
    console.log(this.selectedFields);
    this.fieldsSelected.emit(this.selectedFields);
    this.selectedFields = []; // Clear selected fields after emitting
    this.showFields = false;
    this.eventToggle.emit(this.showFields);
  }

  EditCategoryField(): void {
    console.log(this.selectedFields);
    this.selectedAdditionalFields.emit(this.selectedFields);
    this.showFields = false;
    this.eventToggle.emit(this.showFields);
  }

  toggleFields(): void {
    this.showFields = !this.showFields;
    this.eventToggle.emit(this.showFields);
    if (this.SelectedField != null) {
      this.selectedFields = [...this.SelectedField];
    }
  }
}
