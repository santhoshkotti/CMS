import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldsIn } from 'src/app/interfaces/options';
import { ConnectService } from 'src/app/services/connect/connect.service';

@Component({
  selector: 'app-additional-fields',
  templateUrl: './additional-fields.component.html',
  styleUrls: ['./additional-fields.component.css'],
})
export class AdditionalFieldsComponent {
  @Input() key: string = '';
  @Input() CategoryId: number = 0;
  @Input() SelectedField: any[] = [];
  @Input() IsEdit: boolean = false;
  @Output() fieldsSelected = new EventEmitter<FieldsIn[]>();
  @Output() eventToggle = new EventEmitter<boolean>();
  @Output() selectedAdditionalFields = new EventEmitter<any[]>();

  additionalFields: any[] = [];
  selectedFields: FieldsIn[] = [];
  showFields: boolean = false;

  constructor(private genericService: ConnectService) {}

  ngOnInit(): void {
    if (this.key) {
      this.genericService.getAdditionalFields().subscribe((fields) => {
        this.additionalFields = fields.filter(
          (field) => field.Key === 'AdditionalField'
        );
        console.log('additionalFields', this.additionalFields);
      });
    }
  }

  toggleFields(event: any): void {
    this.showFields = event.target.checked;
    this.eventToggle.emit(this.showFields);
    if (this.SelectedField != null) {
      this.selectedFields = [...this.SelectedField];
    }
  }

  onFieldChange(event: any, field: any): void {
    if (event.target.checked) {
      this.selectedFields = [...this.selectedFields, field.Id];
    } else {
      this.selectedFields = this.selectedFields.filter((f) => f !== field.Id);
    }
    console.log('selectedFields', this.selectedFields);
    console.log('SelectedField', this.SelectedField);
  }

  addFieldsToCategory(): void {
    this.fieldsSelected.emit(this.selectedFields);
    this.selectedFields = []; // Clear selected fields after emitting
    this.showFields = false;
    this.eventToggle.emit(this.showFields);
  }

  EditCategoryField(): void {
    this.selectedAdditionalFields.emit(this.selectedFields);
    this.showFields = false;
    this.eventToggle.emit(this.showFields);
  }
}
