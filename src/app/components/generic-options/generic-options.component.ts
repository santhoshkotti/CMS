// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { map } from 'rxjs';
// import { Options } from 'src/app/interfaces/options';
// import { ConnectService } from 'src/app/services/connect/connect.service';

// @Component({
//   selector: 'app-generic-options',
//   templateUrl: './generic-options.component.html',
//   styleUrls: ['./generic-options.component.css'],
// })
// export class GenericOptionsComponent implements OnInit {
//   key: string = '';
//   newValue: string = '';
//   editValue: string = '';
//   id: number = 0;
//   isEditMode: boolean = false;
//   items: { Id: number; Value: string }[] = [];
//   additionalFields: any[] = [];
//   selectedAdditionalFields: any[] = [];
//   arr: any[] = [];
//   catId: number = 0;
//   toggleEvent: boolean = false;
//   existingAdditionalFields: any[] = [];
//   copyOfExsistingFields: any[] = [];
//   constructor(
//     private genericService: ConnectService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe((params) => {
//       this.key = params['key'] || '';
//       console.log('Key:', this.key);

//       this.genericService.getData().subscribe((options) => {
//         this.items = options
//           .filter((option) => option.Key === this.key)
//           .map((option) => ({
//             Id: option.Id,
//             Value: option.Value,
//           }));
//         console.log(this.items);
//       });

//       if (this.key === 'Category') {
//         this.genericService.getAdditionalFields().subscribe((fields) => {
//           this.additionalFields = fields;
//           console.log(this.additionalFields);
//         });
//       }
//     });
//   }

//   getEditLabel(key: string): string {
//     switch (key) {
//       case 'Category':
//         return 'Category';
//       case 'Forms':
//         return 'Form';
//       case 'Status':
//         return 'Status';
//       case 'ExpirationLimit':
//         return 'Expiration Limit';
//       case 'Role':
//         return 'Role';
//       case 'Permissions':
//         return 'Permission';
//       case 'AdditionalField': // New case for additional fields
//         return 'Additional Field';
//       default:
//         return 'Item';
//     }
//   }

//   getEnterLabel(key: string): string {
//     switch (key) {
//       case 'Category':
//         return 'Category';
//       case 'Forms':
//         return 'Form';
//       case 'Status':
//         return 'Status';
//       case 'ExpirationLimit':
//         return 'Expiration Limit';
//       case 'Role':
//         return 'Role';
//       case 'Permissions':
//         return 'Permission';
//       case 'AdditionalField': // New case for additional fields
//         return 'Additional Field';
//       default:
//         return 'Item';
//     }
//   }
//   async anotherFunction(): Promise<void> {
//     if (this.newValue.trim()) {
//       const option: Options = {
//         Id: 0,
//         Key: this.key,
//         Value: this.newValue,
//       };

//       try {
//         const response = await this.genericService
//           .postData(option)
//           .pipe(map((data) => data as Options))
//           .toPromise();

//         if (response) {
//           // Adding a check to ensure response is not undefined
//           this.items.push(response);
//           this.catId = response.Id;
//           console.log(this.catId);
//           this.newValue = '';
//         }
//       } catch (error) {
//         console.error('Error saving data:', error);
//       }
//     }
//   }

//   // async anotherFunction(): Promise<void> {
//   //   if (this.newValue.trim()) {
//   //     const option: Options = {
//   //       Id: 0,
//   //       Key: this.key,
//   //       Value: this.newValue,
//   //     };
//   //     await this.genericService
//   //       .postData(option)
//   //       .subscribe((response: Options) => {
//   //         this.items.push(response);
//   //         this.catId = response.Id;
//   //         console.log(this.catId);
//   //         this.newValue = '';
//   //       });
//   //   }
//   // }

//   saveItem(): void {
//     if (this.newValue.trim()) {
//       const option: Options = {
//         Id: 0,
//         Key: this.key,
//         Value: this.newValue,
//       };
//       this.genericService.postData(option).subscribe((response: Options) => {
//         this.items.push(response);
//         this.catId = response.Id;
//         console.log(this.catId);
//         this.newValue = '';

//         // Add selected additional fields to the category
//         if (this.key === 'Category' && this.selectedAdditionalFields.length) {
//           this.selectedAdditionalFields.forEach((field) => {
//             const fieldOption: Options = {
//               Id: 0,
//               Key: this.key,
//               Value: `${response.Value} - ${field.Value}`,
//             };
//             this.genericService
//               .postData(fieldOption)
//               .subscribe((res: Options) => {
//                 this.items.push(res);
//               });
//           });
//           this.selectedAdditionalFields = [];
//         }
//       });
//     }
//   }

//   handleEdit(event: { id: number; value: string }): void {
//     this.id = event.id;
//     this.editValue = event.value;
//     this.isEditMode = true;
//     this.catId = event.id;
//     this.existingAdditionalFields = [];
//     this.genericService
//       .editCategory(this.catId)
//       .subscribe((response: any[]) => {
//         console.log(response);
//         this.existingAdditionalFields = response;
//         this.copyOfExsistingFields = this.existingAdditionalFields;
//         console.log(
//           'Existing Additional Fields',
//           this.existingAdditionalFields
//         );
//       });
//   }

//   updateItem(): void {
//     this.genericService.updateData(this.id, this.editValue).subscribe(
//       (response) => {
//         console.log('Option updated successfully:', response);
//         this.items = this.items.map((item) =>
//           item.Id === this.id ? { Id: this.id, Value: this.editValue } : item
//         );
//         this.clearInput();
//         this.isEditMode = false;
//       },
//       (error) => {
//         console.error('Error updating option:', error);
//       }
//     );
//   }

//   handleDelete(event: { id: number }): void {
//     this.genericService.deleteData(event.id).subscribe(
//       (response) => {
//         console.log('Option deleted successfully:', response);
//         this.items = this.items.filter((item) => item.Id !== event.id);
//       },
//       (error) => {
//         console.error('Error deleting option:', error);
//       }
//     );
//   }

//   clearInput() {
//     this.newValue = '';
//     this.editValue = '';
//     this.isEditMode = false;
//   }

//   async handleFieldsSelected(fields: any[]): Promise<void> {
//     this.selectedAdditionalFields = [];
//     this.selectedAdditionalFields = fields;
//     await this.anotherFunction();

//     this.arr = this.selectedAdditionalFields.map((id) => ({
//       CategoryId: this.catId,
//       AdditionalFieldId: id.id,
//     }));
//     this.genericService
//       .addCategoryAdditionalFields(this.arr)
//       .subscribe((response: any) => {
//         console.log('Fields added successfully:', response);
//       });
//     this.toggleEvent = false;
//   }

//   handleToggle(field: any): void {
//     this.toggleEvent = field;
//   }

//   handleUpdateAdditionalFields(fields: any[]): void {
//     console.log(this.copyOfExsistingFields);
//     this.selectedAdditionalFields = [];
//     this.selectedAdditionalFields = fields;
//     // Compare existingAdditionalFields with selectedAdditionalFields

//     const fieldsToAdd = this.selectedAdditionalFields.filter(
//       (field) => !this.existingAdditionalFields.includes(field)
//     );

//     const fieldsToRemove =
//       this.selectedAdditionalFields == null
//         ? this.existingAdditionalFields
//         : this.existingAdditionalFields.filter(
//             (field) => !this.selectedAdditionalFields.includes(field)
//           );

//     this.arr = fieldsToAdd.map((id) => ({
//       CategoryId: this.catId,
//       AdditionalFieldId: id.id,
//     }));

//     // Log the fields to be added and removed
//     console.log('Fields to add:', fieldsToAdd);
//     console.log('Fields to remove:', fieldsToRemove);

//     // Add new fields
//     if (this.arr.length > 0) {
//       this.genericService
//         .addCategoryAdditionalFields(this.arr)
//         .subscribe((response: any) => {
//           console.log('Fields added successfully:', response);
//         });
//     }

//     // Remove old fields
//     if (fieldsToRemove.length > 0) {
//       const arrRemove = fieldsToRemove.map((id) => ({
//         CategoryId: this.catId,
//         AdditionalFieldId: id,
//       }));
//       this.genericService
//         .removeCategoryAdditionalFields(arrRemove)
//         .subscribe((response: any) => {
//           console.log('Fields removed successfully:', response);
//         });
//     }

//     this.updateItem();
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Options, PermissionPayload } from 'src/app/interfaces/options';
import { ConnectService } from 'src/app/services/connect/connect.service';

@Component({
  selector: 'app-generic-options',
  templateUrl: './generic-options.component.html',
  styleUrls: ['./generic-options.component.css'],
})
export class GenericOptionsComponent implements OnInit {
  key: string = '';
  newValue: string = '';
  editValue: string = '';
  id: number = 0;
  isEditMode: boolean = false;
  items: { Id: number; Value: string }[] = [];
  additionalFields: any[] = [];
  selectedAdditionalFields: any[] = [];
  arr: any[] = [];
  catId: number = 0;
  toggleEvent: boolean = false;
  existingAdditionalFields: any[] = [];
  copyOfExsistingFields: any[] = [];

  categories: {
    Id: number;
    Value: string;
    Read?: boolean;
    Write?: boolean;
    Update?: boolean;
    View?: boolean;
  }[] = [];

  usersGmail: string[] = [];
  userId = 0;
  newEmail: string = '';

  createdBy = 1;
  createdAt = new Date().toISOString();

  constructor(
    private genericService: ConnectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.key = params['key'] || '';
      console.log('Key:', this.key);

      this.genericService.getData().subscribe((options) => {
        this.items = options
          .filter((option) => option.Key === this.key)
          .map((option) => ({
            Id: option.Id,
            Value: option.Value,
          }));
        console.log(this.items);
      });

      if (this.key === 'Category') {
        this.genericService.getAdditionalFields().subscribe((fields) => {
          this.additionalFields = fields;
          console.log(this.additionalFields);
        });
      }

      if (this.key === 'Role') {
        this.fetchCategories();
      }
    });
    this.genericService.getUser().subscribe(
      (users) => {
        this.usersGmail = users.map((user) => user.Email);
        if (users.length > 0) {
          this.userId = users[users.length - 1].Id;
        }
        console.log('User emails:', this.usersGmail); // Optional: log the emails
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
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
      // case 'Permissions':
      //   return 'Permission';
      case 'AdditionalField': // New case for additional fields
        return 'Additional Field';
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
      // case 'Permissions':
      //   return 'Permission';
      case 'AdditionalField': // New case for additional fields
        return 'Additional Field';
      default:
        return 'Item';
    }
  }

  fetchCategories(): void {
    this.genericService.getData().subscribe((options) => {
      this.categories = options
        .filter((option) => option.Key === 'Category')
        .map((option) => ({
          Id: option.Id,
          Value: option.Value,
          Read: false,
          Write: false,
          Update: false,
          View: false,
        }));
    });
  }

  createPermissionPayload(
    categoryId: number,
    permissionId: number
  ): PermissionPayload {
    return {
      RoleId: this.id,
      CategoryId: categoryId,
      PermissionId: permissionId,
      CreatedBy: this.createdBy,
      CreatedAt: this.createdAt,
      UpdatedBy: this.createdBy,
      UpdatedAt: this.createdAt,
    };
  }

  postPermissions() {
    this.categories.forEach((category) => {
      if (category.Read) {
        this.genericService
          .postRoleCategoryPermissions(
            this.createPermissionPayload(category.Id, 9)
          )
          .subscribe((response) => {
            console.log('Permission posted successfully', response);
          });
      }
      if (category.Write) {
        this.genericService
          .postRoleCategoryPermissions(
            this.createPermissionPayload(category.Id, 10)
          )
          .subscribe((response) => {
            console.log('Permission posted successfully', response);
          });
      }
      if (category.Update) {
        this.genericService
          .postRoleCategoryPermissions(
            this.createPermissionPayload(category.Id, 11)
          )
          .subscribe((response) => {
            console.log('Permission posted successfully', response);
          });
      }
      if (category.View) {
        this.genericService
          .postRoleCategoryPermissions(
            this.createPermissionPayload(category.Id, 12)
          )
          .subscribe((response) => {
            console.log('Permission posted successfully', response);
          });
      }
    });
  }

  async anotherFunction(): Promise<void> {
    if (this.newValue.trim()) {
      const option: Options = {
        Id: 0,
        Key: this.key,
        Value: this.newValue,
      };

      try {
        const response = await this.genericService
          .postData(option)
          .pipe(map((data) => data as Options))
          .toPromise();

        if (response) {
          // Adding a check to ensure response is not undefined
          this.items.push(response);
          this.catId = response.Id;
          console.log(this.catId);
          this.newValue = '';
        }
      } catch (error) {
        console.error('Error saving data:', error);
      }
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
        this.catId = response.Id;
        console.log(this.catId);
        this.newValue = '';

        // Add selected additional fields to the category
        if (this.key === 'Category' && this.selectedAdditionalFields.length) {
          this.selectedAdditionalFields.forEach((field) => {
            const fieldOption: Options = {
              Id: 0,
              Key: this.key,
              Value: `${response.Value} - ${field.Value}`,
            };
            this.genericService
              .postData(fieldOption)
              .subscribe((res: Options) => {
                this.items.push(res);
              });
          });
          this.selectedAdditionalFields = [];
        }

        // Add permissions for roles
        if (this.key === 'Role') {
          this.postPermissions();
        }
      });
    }
    this.openedit = false;
  }

  handleEdit(event: { id: number; value: string }): void {
    //this.toggleEvent = true;
    this.openedit = true;
    this.id = event.id;
    this.editValue = event.value;
    this.isEditMode = true;
    this.catId = event.id;
    this.existingAdditionalFields = [];
    this.genericService
      .editCategory(this.catId)
      .subscribe((response: any[]) => {
        console.log(response);
        this.existingAdditionalFields = response;
        this.copyOfExsistingFields = this.existingAdditionalFields;
        console.log(
          'Existing Additional Fields',
          this.existingAdditionalFields
        );
      });

    if (this.key === 'Role') {
      this.fetchCategories();
    }
  }

  updateItem(): void {
    this.genericService.updateData(this.id, this.editValue).subscribe(
      (response) => {
        console.log('Option updated successfully:', response);
        this.items = this.items.map((item) =>
          item.Id === this.id ? { Id: this.id, Value: this.editValue } : item
        );
        this.clearInput();
        this.isEditMode = false;

        // Update permissions for roles
        if (this.key === 'Role') {
          this.postPermissions();
        }
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
        this.items = this.items.filter((item) => item.Id !== event.id);
      },
      (error) => {
        console.error('Error deleting option:', error);
      }
    );
  }

  clearInput() {
    this.newValue = '';
    this.editValue = '';
    this.isEditMode = false;
    this.openedit = false;
  }

  async handleFieldsSelected(fields: any[]): Promise<void> {
    this.selectedAdditionalFields = [];
    this.selectedAdditionalFields = fields;
    await this.anotherFunction();

    this.arr = this.selectedAdditionalFields.map((id) => ({
      CategoryId: this.catId,
      AdditionalFieldId: id.id,
    }));
    this.genericService
      .addCategoryAdditionalFields(this.arr)
      .subscribe((response: any) => {
        console.log('Fields added successfully:', response);
      });
    this.toggleEvent = false;
  }

  handleToggle(field: any): void {
    this.toggleEvent = field;
  }

  // handleUpdateAdditionalFields(fields: any[]): void {
  //   console.log(this.copyOfExsistingFields);
  //   this.selectedAdditionalFields = [];
  //   this.selectedAdditionalFields = fields;
  //   // Separate arrays for new and existing fields
  //   const newFields = this.selectedAdditionalFields.filter(
  //     (field) =>
  //       !this.existingAdditionalFields.some(
  //         (existingField) => existingField.Id === field.id
  //       )
  //   );
  //   const deletedFields = this.existingAdditionalFields.filter(
  //     (existingField) =>
  //       !this.selectedAdditionalFields.some(
  //         (field) => field.id === existingField.Id
  //       )
  //   );

  //   // Update existing fields
  //   this.genericService
  //     .removeCategoryAdditionalFields(deletedFields)
  //     .subscribe((response: any) => {
  //       console.log('Existing fields deleted successfully:', response);
  //     });

  //   this.arr = newFields.map((id) => ({
  //     CategoryId: this.catId,
  //     AdditionalFieldId: id.id,
  //   }));

  //   this.genericService
  //     .addCategoryAdditionalFields(this.arr)
  //     .subscribe((response: any) => {
  //       console.log('New fields added successfully:', response);
  //     });
  //     this.updateItem();
  // }
  handleUpdateAdditionalFields(fields: any[]): void {
    console.log(this.copyOfExsistingFields);
    this.selectedAdditionalFields = [];
    this.selectedAdditionalFields = fields;
    // Compare existingAdditionalFields with selectedAdditionalFields

    const fieldsToAdd = this.selectedAdditionalFields.filter(
      (field) => !this.existingAdditionalFields.includes(field)
    );

    const fieldsToRemove =
      this.selectedAdditionalFields == null
        ? this.existingAdditionalFields
        : this.existingAdditionalFields.filter(
            (field) => !this.selectedAdditionalFields.includes(field)
          );

    this.arr = fieldsToAdd.map((id) => ({
      CategoryId: this.catId,
      AdditionalFieldId: id.id,
    }));

    // Log the fields to be added and removed
    console.log('Fields to add:', fieldsToAdd);
    console.log('Fields to remove:', fieldsToRemove);

    // Add new fields
    if (this.arr.length > 0) {
      this.genericService
        .addCategoryAdditionalFields(this.arr)
        .subscribe((response: any) => {
          console.log('Fields added successfully:', response);
        });
    }

    // Remove old fields
    if (fieldsToRemove.length > 0) {
      const arrRemove = fieldsToRemove.map((id) => ({
        CategoryId: this.catId,
        AdditionalFieldId: id.AdditionalFieldId,
      }));
      this.genericService
        .removeCategoryAdditionalFields(arrRemove)
        .subscribe((response: any) => {
          console.log('Fields removed successfully:', response);
        });
    }

    this.updateItem();
  }

  handleDropdownSelection(): void {
    console.log('Dropdown selected:', this.key);
  }
  callBoth() {
    if (this.usersGmail.includes(this.newEmail)) {
      window.alert('user email already exists');
    } else {
      console.log(this.newEmail);
      // this.createUser();
      // this.postUserRole();
      this.postPermissions();
    }
  }
  openedit: boolean = false;
  openaddnew() {
    this.openedit = !this.openedit;
    this.isEditMode = false;
    this.newValue = '';
  }
}
