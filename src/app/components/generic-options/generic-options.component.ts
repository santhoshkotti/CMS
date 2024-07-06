import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Options } from 'src/app/interfaces/options';
import { ConnectService } from 'src/app/services/connect/connect.service';

@Component({
  selector: 'app-generic-options',
  templateUrl: './generic-options.component.html',
  styleUrls: ['./generic-options.component.css']
})
export class GenericOptionsComponent {
  key: string = '';
  newValue: string = '';
  editValue: string = '';
  id: number = 0;
  isEditMode: boolean = false;
  items: { Id: number; Value: string }[] = [];

  constructor(
    private genericService: ConnectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route params to get 'key' query parameter
    this.route.queryParams.subscribe((params) => {
      this.key = params['key'] || ''; // Assign 'key' from queryParams or default to empty string
      console.log('Key:', this.key); // Log to verify the value of this.key

      // Fetch data based on this.key
      this.genericService.getData().subscribe((options) => {
        this.items = options
          .filter((option) => option.Key === this.key)
          .map((option) => ({
            Id: option.Id,
            Value: option.Value,
          }));
        console.log(this.items);
      });
    });
  }
  getEditLabel(key: string): string {
    switch (key) {
      case 'Category':
        return 'Category';
      case 'Forms':
        return 'Form';
      case 'Status':
        return 'Status';
      case 'ExpirationLimit':
        return 'Expiration Limit';
      case 'Role':
        return 'Role';
      case 'Permissions':
        return 'Permission';
      default:
        return 'Item';
    }
  }

  getEnterLabel(key: string): string {
    switch (key) {
      case 'Category':
        return 'Category';
      case 'Forms':
        return 'Form';
      case 'Status':
        return 'Status';
      case 'ExpirationLimit':
        return 'Expiration Limit';
      case 'Role':
        return 'Role';
      case 'Permissions':
        return 'Permission';
      default:
        return 'Item';
    }
  }

  saveItem(): void {
    if (this.newValue.trim()) {
      const option: Options = {
        Id: 0,
        Key: this.key,
        Value: this.newValue,
      };
      this.genericService.postData(option).subscribe((response: Options) => {
        this.items.push(response);
        this.newValue = '';
      });
    }
  }

  handleEdit(event: { id: number; value: string }): void {
    this.id = event.id;
    this.editValue = event.value;
    this.isEditMode = true;
  }

  updateItem(): void {
    this.genericService.updateData(this.id, this.editValue).subscribe(
      (response) => {
        console.log('Option updated successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error updating option:', error);
      }
    );
  }

  handleDelete(event: { id: number }): void {
    this.genericService.deleteData(event.id).subscribe(
      (response) => {
        console.log('Option deleted successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting option:', error);
      }
    );
  }

  clearInput() {
    this.newValue = '';
    this.editValue = '';
  }

}
