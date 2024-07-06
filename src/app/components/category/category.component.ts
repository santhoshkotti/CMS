import { Component } from '@angular/core';
import { Options } from 'src/app/interfaces/options';
import { ConnectService } from 'src/app/services/connect/connect.service';
//import { ConnectService } from 'src/app/services/connect.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  // newCategory: string = '';
  // editCategory: string = '';
  // id:number=0;
  // isEditMode: boolean = false;
  // //categories :string[] = ['finance','employement','third-party','business'];
  // //categories: any[] = [];

  // categories: { Id: number, Value: string }[] = [];
  // constructor(private connect: ConnectService) {}

  // ngOnInit(): void {
  //   this.connect.getData().subscribe((options) => {
  //     this.categories = options
  //       .filter((option) => option.Key === 'Category')
  //       .map((option) =>  ({
  //         Id: option.Id,
  //         Value: option.Value
  //       }));
  //   });
  // }
  // saveCategory(): void {
  //   if (this.newCategory.trim()) {
  //     const categoryOption: Options = {
  //       Id: 0,  // Assuming the server will assign an ID
  //       Key: 'Category',
  //       Value: this.newCategory
  //     };
  //     this.connect.postData(categoryOption).subscribe((response: Options) => {
  //       this.categories.push(response);
  //       this.newCategory = '';
  //     });
  //   }
  // }


  // handleEdit(event: { id: number; value: string }): void {
  //   this.id=event.id;
  //   this.editCategory=event.value;
  //   this.isEditMode = true;
  // }

  // updateCategory(): void {

  //     this.connect.updateData(this.id, this.editCategory).subscribe(
  //       response => {
  //         console.log('Option updated successfully:', response);
  //         window.location.reload();
  //       },
  //       error => {
  //         console.error('Error updating option:', error);
  //       }
  //     );
  // }
  // handleDelete(event: { id: number }) {
  //   this.connect.deleteData(event.id).subscribe(
  //     response => {
  //       console.log('Option deleted successfully:', response);
  //       window.location.reload();
  //     },
  //     error => {
  //       console.error('Error deleting option:', error);
  //     }
  //   );
  // }
  // clearInput() {
  //   this.newCategory = '';
  //   this.editCategory = '';
  // }

}
