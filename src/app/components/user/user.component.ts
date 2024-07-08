import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Options,
  PermissionPayload,
  UserRole,
  Users,
} from 'src/app/interfaces/options';
import { ConnectService } from 'src/app/services/connect/connect.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  key: string = '';
  newFirstName: string = '';
  newLastName: string = '';
  newEmail: string = '';

  editFirstName: string = '';
  editLastName: string = '';
  editEmail: string = '';

  items: { Id: number; Value: string }[] = [];
  usersGmail: string[] = [];
  selectedItem: number = 0;

  categories: {
    Id: number;
    Value: string;
    Read?: boolean;
    Write?: boolean;
    Update?: boolean;
    View?: boolean;
  }[] = [];

  editValue: string = '';
  id: number = 0;
  isEditMode: boolean = false;

  //roleId = 0;
  userId = 0;
  createdBy = 1;
  createdAt = new Date().toISOString();

  constructor(private genericService: ConnectService) {}

  ngOnInit(): void {
    this.genericService.getData().subscribe((options) => {
      console.log(options);
      this.items = options
        .filter((option) => option.Key === 'Role')
        .map((option) => ({
          Id: option.Id,
          Value: option.Value,
        }));
      this.categories = options
        .filter((option) => option.Key === 'Category')
        .map((option) => ({
          Id: option.Id,
          Value: option.Value,
        }));
      console.log(this.items);
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

  createUser() {
    const newUser: Users = {
      Id: 0,
      FirstName: this.newFirstName,
      LastName: this.newLastName,
      Email: this.newEmail,
      HashPassword: 'defaultPassword', // Replace with actual password handling
    };

    this.genericService.postUser(newUser).subscribe(
      (response) => {
        console.log('User created:', response);
        this.newFirstName = '';
        this.newLastName = '';
        this.newEmail = '';
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
  createPermissionPayload(
    categoryId: number,
    permissionId: number
  ): PermissionPayload {
    return {
      RoleId: this.selectedItem,
      CategoryId: categoryId,
      PermissionId: permissionId,
      CreatedBy: this.createdBy,
      CreatedAt: this.createdAt,
      UpdatedBy: this.createdBy,
      UpdatedAt: this.createdAt,
    };
  }
  createUserRolePalyload(): UserRole {
    return {
      UserId: this.userId + 1,
      RoleId: this.selectedItem,
      CreatedBy: this.createdBy,
      CreatedAt: this.createdAt,
      UpdatedBy: this.createdBy,
      UpdatedAt: this.createdAt,
    };
  }

  postUserRole() {
    this.genericService
      .postUserRole(this.createUserRolePalyload())
      .subscribe((response) => {
        console.log('UserRole posted successfully', response);
      });
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

  callBoth() {
    if (this.usersGmail.includes(this.newEmail)) {
      window.alert('user email already exists');
    } else {
      console.log(this.newEmail);
      this.createUser();
      this.postUserRole();
      this.postPermissions();
    }
  }

  // getEditLabel(key: string): string {
  //   switch (key) {
  //     case 'Category':
  //       return 'Category';
  //     case 'Forms':
  //       return 'Form';
  //     case 'Status':
  //       return 'Status';
  //     case 'ExpirationLimit':
  //       return 'Expiration Limit';
  //     case 'Role':
  //       return 'Role';
  //     case 'Permissions':
  //       return 'Permission';
  //     default:
  //       return 'Item';
  //   }
  // }

  // getEnterLabel(key: string): string {
  //   switch (key) {
  //     case 'Category':
  //       return 'Category';
  //     case 'Forms':
  //       return 'Form';
  //     case 'Status':
  //       return 'Status';
  //     case 'ExpirationLimit':
  //       return 'Expiration Limit';
  //     case 'Role':
  //       return 'Role';
  //     case 'Permissions':
  //       return 'Permission';
  //     default:
  //       return 'Item';
  //   }
  // }

  // saveItem(): void {
  //   if (this.newFirstName.trim()) {
  //     const option: Options = {
  //       Id: 0,
  //       Key: this.key,
  //       Value: this.newFirstName,
  //     };
  //     this.genericService.postData(option).subscribe((response: Options) => {
  //       this.items.push(response);
  //       this.newFirstName = '';
  //     });
  //   }
  // }

  // handleEdit(event: { id: number; value: string }): void {
  //   this.id = event.id;
  //   this.editValue = event.value;
  //   this.isEditMode = true;
  // }

  // updateItem(): void {
  //   this.genericService.updateData(this.id, this.editValue).subscribe(
  //     (response) => {
  //       console.log('Option updated successfully:', response);
  //       window.location.reload();
  //     },
  //     (error) => {
  //       console.error('Error updating option:', error);
  //     }
  //   );
  // }

  // handleDelete(event: { id: number }): void {
  //   this.genericService.deleteData(event.id).subscribe(
  //     (response) => {
  //       console.log('Option deleted successfully:', response);
  //       window.location.reload();
  //     },
  //     (error) => {
  //       console.error('Error deleting option:', error);
  //     }
  //   );
  // }

  // clearInput() {
  //   this.newFirstName = '';
  //   this.newLastName = '';
  //   this.newEmail = '';

  //   this.editFirstName = '';
  //   this.editLastName = '';
  //   this.editEmail = '';
  // }
}
