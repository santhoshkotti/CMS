
import { ContractformService } from './../../services/contractFormService/contractform.service';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category, CombinedData, Contracts } from 'src/app/interfaces/options';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {

   constructor(private contractService:ContractformService){   }
      ngOnInit(){
         this.getCombinedData();
       }

   showContract:Contracts[]=[];
   combinedData: CombinedData[] = [];

   //to show the list of contracttypes in modal
   categoriess:{id:number,value:string}[]=[];
   status:{id:number,value:string}[]=[];

   getCombinedData() {
     forkJoin([this.contractService.getContractFormdetails(), this.contractService.getContractTypes()])
       .subscribe(([contracts, categories]) => {
           this.showContract = contracts;

           this.categoriess = categories
             .filter(option => option.Key === 'Category')
             .map(option => ({ id: option.Id, value: option.Value }));

           this.status = categories
             .filter(option=> option.Key === 'Status')
             .map(option => ({id:option.Id,value:option.Value}));

           this.combinedData = this.mergeData(this.showContract,this.categoriess,this.status);
           this.dataSource.data = this.combinedData;
      });
   }

  mergeData(contracts:any[], categories:any[],status:any[]) {
     return contracts.map(contract => {
         const category = categories.find(c => c.id === contract.CategoryId );
         const statusva = status.find(h => h.id === Number(contract.StatusId));
      return {
         ...contract,
          Category: category ? category.value : null,
          Status : statusva ? statusva.value : null,
          } as CombinedData;
        });
   }


   displayedColumns: string[] = [
      'Id', 'UniqueNo',  'ContractCode', 'Project',   'status','Version', 'Category','AutoRenewal',
      'Account', 'Client','SigningDate', 'StartingDate','TerminationDate','Current'];

   dataSource = new MatTableDataSource<CombinedData>([]);
       @ViewChild(MatPaginator) paginator!: MatPaginator;
       @ViewChild(MatSort) sort!: MatSort;

   drop(event: CdkDragDrop<string[]>) {
       moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
   }

   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
   }


  selectedCategories: string[] = [];
  selectedAutoRenewal: boolean | null = null;
  selectedStatuses: string[] = [];

  applyFilters() {
    this.dataSource.filterPredicate = (data, filtersJson) => {
      const { selectedCategories, selectedAutoRenewal, selectedStatuses } = JSON.parse(filtersJson);
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(data.Category)) {
        return false;
      }
      // AutoRenewal filter
      if ((selectedAutoRenewal) !== null && data.AutoRenewal !== (selectedAutoRenewal)) {
        return false;
      }
      // Status filter
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(data.Status)) {
        return false;
      }
      return true;
    };

    // Apply the filters
    this.dataSource.filter = JSON.stringify({
      selectedCategories: this.selectedCategories,
      selectedAutoRenewal: this.selectedAutoRenewal,
      selectedStatuses: this.selectedStatuses
     });
   }

   resetFilters() {
     this.selectedCategories = [];
     this.selectedAutoRenewal = null;
     this.selectedStatuses = [];
     this.applyFilters();
    }

   onAutoRenewalChange(event: MatCheckboxChange, value: boolean | null) {
     if (event.checked) {
       this.selectedAutoRenewal = value;
     } else if (value === this.selectedAutoRenewal) {
       this.selectedAutoRenewal = null;
     }
     this.applyFilters();
    }


   onCategorySelectionChange(event: MatCheckboxChange, category: string) {
     if (event.checked) {
       this.selectedCategories.push(category);
     } else {
       this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
     }
     this.applyFilters();
    }

  onStatusSelectionChange(event: MatCheckboxChange, status: string) {
    if (event.checked) {
      this.selectedStatuses.push(status);
    } else {
      this.selectedStatuses = this.selectedStatuses.filter(stat => stat !== status);
    }
    this.applyFilters();
  }
}
