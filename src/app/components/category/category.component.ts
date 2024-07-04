import { Component } from '@angular/core';
//import { ConnectService } from 'src/app/services/connect.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  newCategory: string = '';

  //categories :string[] = ['finance','employement','third-party','business'];
  categories: string[] = [];
  // constructor(private connect: ConnectService) {}
  // saveCategory(): void {
  //   if (this.newCategory.trim()) {
  //     const categoryOption = {
  //       Key: 'Category',
  //       Value: this.newCategory
  //     };
  //     this.connect.postCategory(categoryOption).subscribe((response) => {
  //       this.categories.push(response.Value);
  //       this.newCategory = '';
  //     });
  //   }
  // }
  // ngOnInit(): void {
  //   this.connect.getCategories().subscribe((options) => {
  //     this.categories = options
  //       .filter((option) => option.Key === 'Category')
  //       .map((option) => option.Value);
  //   });
  // }
}
