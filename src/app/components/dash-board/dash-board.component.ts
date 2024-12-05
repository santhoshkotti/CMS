// import { ContractformService } from './../../services/contractFormService/contractform.service';
// import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Category, CombinedData, Contracts } from 'src/app/interfaces/options';
// import { forkJoin } from 'rxjs';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableModule } from '@angular/material/table';
// import {
//   CdkDragDrop,
//   CdkDrag,
//   CdkDropList,
//   moveItemInArray,
// } from '@angular/cdk/drag-drop';
// import { MatCheckboxChange } from '@angular/material/checkbox';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dash-board',
//   templateUrl: './dash-board.component.html',
//   styleUrls: ['./dash-board.component.css'],
// })
// export class DashBoardComponent {
//   constructor(
//     private contractService: ContractformService,
//     private router: Router
//   ) {}
//   ngOnInit() {
//     this.getCombinedData();
//   }

//   showContract: Contracts[] = [];
//   combinedData: CombinedData[] = [];

//   //to show the list of contracttypes in modal
//   categoriess: { id: number; value: string }[] = [];
//   status: { id: number; value: string }[] = [];

//   getCombinedData() {
//     forkJoin([
//       this.contractService.getContractFormdetails(),
//       this.contractService.getContractTypes(),
//     ]).subscribe(([contracts, categories]) => {
//       this.showContract = contracts;

//       this.categoriess = categories
//         .filter((option) => option.Key === 'Category')
//         .map((option) => ({ id: option.Id, value: option.Value }));

//       this.status = categories
//         .filter((option) => option.Key === 'Status')
//         .map((option) => ({ id: option.Id, value: option.Value }));

//       this.combinedData = this.mergeData(
//         this.showContract,
//         this.categoriess,
//         this.status
//       );
//       this.dataSource.data = this.combinedData;
//     });
//   }

//   mergeData(contracts: any[], categories: any[], status: any[]) {
//     return contracts.map((contract) => {
//       const category = categories.find((c) => c.id === contract.CategoryId);
//       const statusva = status.find((h) => h.id === Number(contract.StatusId));
//       return {
//         ...contract,
//         Category: category ? category.value : null,
//         Status: statusva ? statusva.value : null,
//       } as CombinedData;
//     });
//   }

//   displayedColumns: string[] = [
//     'Id',
//     'UniqueNo',
//     'ContractCode',
//     'Project',
//     'status',
//     'Version',
//     'Category',
//     'AutoRenewal',
//     'Account',
//     'Client',
//     'SigningDate',
//     'StartingDate',
//     'TerminationDate',
//     'Current',
//   ];

//   dataSource = new MatTableDataSource<CombinedData>([]);
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   drop(event: CdkDragDrop<string[]>) {
//     moveItemInArray(
//       this.displayedColumns,
//       event.previousIndex,
//       event.currentIndex
//     );
//   }

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(filterValue: string) {
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }

//   selectedCategories: string[] = [];
//   selectedAutoRenewal: boolean | null = null;
//   selectedStatuses: string[] = [];

//   applyFilters() {
//     this.dataSource.filterPredicate = (data, filtersJson) => {
//       const { selectedCategories, selectedAutoRenewal, selectedStatuses } =
//         JSON.parse(filtersJson);
//       // Category filter
//       if (
//         selectedCategories.length > 0 &&
//         !selectedCategories.includes(data.Category)
//       ) {
//         return false;
//       }
//       // AutoRenewal filter
//       if (
//         selectedAutoRenewal !== null &&
//         data.AutoRenewal !== selectedAutoRenewal
//       ) {
//         return false;
//       }
//       // Status filter
//       if (
//         selectedStatuses.length > 0 &&
//         !selectedStatuses.includes(data.Status)
//       ) {
//         return false;
//       }
//       return true;
//     };

//     // Apply the filters
//     this.dataSource.filter = JSON.stringify({
//       selectedCategories: this.selectedCategories,
//       selectedAutoRenewal: this.selectedAutoRenewal,
//       selectedStatuses: this.selectedStatuses,
//     });
//   }

//   resetFilters() {
//     this.selectedCategories = [];
//     this.selectedAutoRenewal = null;
//     this.selectedStatuses = [];
//     this.applyFilters();
//   }

//   onAutoRenewalChange(event: MatCheckboxChange, value: boolean | null) {
//     if (event.checked) {
//       this.selectedAutoRenewal = value;
//     } else if (value === this.selectedAutoRenewal) {
//       this.selectedAutoRenewal = null;
//     }
//     this.applyFilters();
//   }

//   onCategorySelectionChange(event: MatCheckboxChange, category: string) {
//     if (event.checked) {
//       this.selectedCategories.push(category);
//     } else {
//       this.selectedCategories = this.selectedCategories.filter(
//         (cat) => cat !== category
//       );
//     }
//     this.applyFilters();
//   }

//   onStatusSelectionChange(event: MatCheckboxChange, status: string) {
//     if (event.checked) {
//       this.selectedStatuses.push(status);
//     } else {
//       this.selectedStatuses = this.selectedStatuses.filter(
//         (stat) => stat !== status
//       );
//     }
//     this.applyFilters();
//   }

//   selectedContract!: Contracts;
//   onRowClick(tabledetails: any): void {
//     this.selectedContract = tabledetails;
//     this.router.navigate(['/contractview'], {
//       queryParams: { contractId: tabledetails.Id },
//     });

//     console.log('select in dash');
//     console.log(this.selectedContract);
//   }
//   hello() {
//     alert('hello');
//   }

//   deleteContract(id: number) {
//     this.contractService.deleteContract(id).subscribe({});
//   }
// }

import { ContractformService } from './../../services/contractFormService/contractform.service';
import {
  Component,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import {
  additionalFields,
  Category,
  CombinedData,
  Contracts,
  Options,
} from 'src/app/interfaces/options';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import {
  Overlay,
  OverlayPositionBuilder,
  ConnectedPosition,
} from '@angular/cdk/overlay';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent {
  isDropdownOpen = false;
  activeSubmenu: string | null = null;
  // selectedAutoRenewal: boolean | null = null;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSubmenu(submenu: string) {
    this.activeSubmenu = this.activeSubmenu === submenu ? null : submenu;
  }

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  constructor(
    private contractService: ContractformService,
    private router: Router,
    private overlay: Overlay,
    private positionBuilder: OverlayPositionBuilder,
    private fb: FormBuilder
  ) {
    this.newContract = {
      Id: 0,
      UniqueNo: null,
      Version: null,
      Current: true,
      CategoryId: null,
      TypeId: null,
      CounterParty: '',
      Account: '',
      Client: '',
      Project: '',
      CounterPartyOwner: '',
      LegalOwnerId: null,
      BuissenessOWnerId: null,
      StatusId: null,
      SigningDate: null,
      StartingDate: null,
      TerminationDate: null,
      RenewalDateFlagOff: null,
      Value: null,
      Jurisdiction: '',
      LiabilitiesCap: null,
      Notes: 'This is another sample Contract',
      OpenIssues: 'None',
      ExpirationLimitId: null,
      FormsId: null,
      Link: 'https://example.com/contract5',
      AutoRenewal: null,
      ContractCode: '',
      Filename: null,
    };
  }
  ngOnInit() {
    this.getContractsTypes();
    this.getTypes();
    this.getUsers();
    this.getCombinedData();
    this.onColumnChange();
    // this.showSuccess();
  }

  showContract: Contracts[] = [];
  combinedData: CombinedData[] = [];
  categoriess: { id: number; value: string }[] = [];
  status: { id: number; value: string }[] = [];

  getCombinedData() {
    forkJoin([
      this.contractService.getContractFormdetails(),
      this.contractService.getContractTypes(),
    ]).subscribe(([contracts, categories]) => {
      this.showContract = contracts;

      this.categoriess = categories
        .filter((option) => option.Key === 'Category')
        .map((option) => ({ id: option.Id, value: option.Value }));

      this.status = categories
        .filter((option) => option.Key === 'Status')
        .map((option) => ({ id: option.Id, value: option.Value }));

      this.combinedData = this.mergeData(
        this.showContract,
        this.categoriess,
        this.status
      );
      this.dataSource.data = this.getLatestContracts(this.combinedData);
      //  this.dataSource.data = this.combinedData;
    });
  }

  mergeData(contracts: any[], categories: any[], status: any[]) {
    return contracts.map((contract) => {
      const category = categories.find((c) => c.id === contract.CategoryId);
      const statusva = status.find((h) => h.id === Number(contract.StatusId));
      return {
        ...contract,
        Category: category ? category.value : null,
        Status: statusva ? statusva.value : null,
      } as CombinedData;
    });
  }

  displayedColumns: string[] = [
    'Id',
    'UniqueNo',
    'ContractCode',
    'Project',
    'status',
    'Version',
    'Category',
    'AutoRenewal',
    'Account',
    'Client',
    'SigningDate',
    'StartingDate',
    'TerminationDate',
    'Current',
  ];

  allColumns = [
    { name: 'Id', field: 'Id', selected: false, headerColor: '#084d93' },
    {
      name: 'UniqueNo',
      field: 'UniqueNo',
      selected: false,
      headerColor: '#084d93',
    },
    {
      name: 'ContractCode',
      field: 'ContractCode',
      selected: true,
      headerColor: '#084d93',
    },
    {
      name: 'Project',
      field: 'Project',
      selected: true,
      headerColor: '#084d93',
    },
    { name: 'Status', field: 'Status', selected: true, headerColor: '#084d93' },
    {
      name: 'Category',
      field: 'Category',
      selected: true,
      headerColor: '#084d93',
    },
    {
      name: 'Version',
      field: 'Version',
      selected: false,
      headerColor: '#084d93',
    },
    {
      name: 'Current',
      field: 'Current',
      selected: false,
      headerColor: '#084d93',
    },
    {
      name: 'Account',
      field: 'Account',
      selected: false,
      headerColor: '#084d93',
    },
    {
      name: 'Client',
      field: 'Client',
      selected: false,
      headerColor: '#084d93',
    },
    {
      name: 'SigningDate',
      field: 'SigningDate',
      selected: true,
      headerColor: '#084d93',
    },
    {
      name: 'StartingDate',
      field: 'StartingDate',
      selected: false,
      headerColor: '#084d93',
    },
    {
      name: 'TerminationDate',
      field: 'TerminationDate',
      selected: false,
      headerColor: '#084d93',
    },
    {
      name: 'AutoRenewal',
      field: 'AutoRenewal',
      selected: true,
      headerColor: '#084d93',
    },
  ];

  onColumnChange() {
    this.displayedColumns = this.allColumns
      .filter((column) => column.selected)
      .map((column) => column.field);
  }

  dataSource = new MatTableDataSource<CombinedData>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //  this.initializeDropdown();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectedCategories: string[] = [];
  selectedAutoRenewal: boolean | null = null;
  selectedStatuses: string[] = [];

  applyFilters() {
    this.dataSource.filterPredicate = (data, filtersJson) => {
      const { selectedCategories, selectedAutoRenewal, selectedStatuses } =
        JSON.parse(filtersJson);
      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(data.Category)
      ) {
        return false;
      }
      // AutoRenewal filter
      if (
        selectedAutoRenewal !== null &&
        data.AutoRenewal !== selectedAutoRenewal
      ) {
        return false;
      }
      // Status filter
      if (
        selectedStatuses.length > 0 &&
        !selectedStatuses.includes(data.Status)
      ) {
        return false;
      }
      return true;
    };

    // Apply the filters
    this.dataSource.filter = JSON.stringify({
      selectedCategories: this.selectedCategories,
      selectedAutoRenewal: this.selectedAutoRenewal,
      selectedStatuses: this.selectedStatuses,
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
      this.selectedCategories = this.selectedCategories.filter(
        (cat) => cat !== category
      );
    }
    this.applyFilters();
  }

  onStatusSelectionChange(event: MatCheckboxChange, status: string) {
    if (event.checked) {
      this.selectedStatuses.push(status);
    } else {
      this.selectedStatuses = this.selectedStatuses.filter(
        (stat) => stat !== status
      );
    }
    this.applyFilters();
  }

  selectedContract!: Contracts;
  onRowClick(tabledetails: any): void {
    this.selectedContract = tabledetails;
    this.router.navigate(['/contractview'], {
      queryParams: { contractId: tabledetails.Id },
    });
  }
  getLatestContracts(contracts: any[]): any[] {
    const contractMap = new Map<string, any>();
    contracts.forEach((contract) => {
      const contractCode = contract.ContractCode;
      const existingContract = contractMap.get(contractCode);
      if (!existingContract || existingContract.Version < contract.Version) {
        contractMap.set(contractCode, contract);
      }
    });
    return Array.from(contractMap.values());
  }

  newContract!: Contracts;
  additionalFields: any;
  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async onSubmit() {
    if (this.additionalFields == 0) {
      if (this.currentstep < this.steps) {
        this.currentstep++;
      }
      const check = await this.createContract(this.newContract);
      await this.delay(2000);

      if (check) {
        // this.showSuccess();
        this.closeModal('datee-modal');
      }
    }
  }
  id!: string;
  navigateToFormContract(category: string): void {
    this.router.navigate(['/formcontract'], {
      queryParams: { contractType: category },
    });
  }

  forms: { id: number; value: string }[] = [];
  types: { id: number; value: String }[] = [];
  expirationLimit: { id: number; value: String }[] = [];
  usersOwners: { id: number; value: string }[] = [];
  responseOptions: Options[] = [];
  getContractsTypes() {
    this.contractService.getContractTypes().subscribe((response) => {
      this.responseOptions = response;
      this.forms = response
        .filter((option) => option.Key === 'Forms')
        .map((option) => ({ id: option.Id, value: option.Value }));

      this.expirationLimit = response
        .filter((option) => option.Key === 'ExpirationLimit')
        .map((option) => ({ id: option.Id, value: option.Value }));
    });
  }

  getTypes() {
    this.contractService.getTypes().subscribe((response) => {
      this.types = response.map((type) => ({
        id: type.Id,
        value: type.Name,
      }));
    });
  }

  getUsers() {
    this.contractService.getUserForOwners().subscribe((response) => {
      this.usersOwners = response.map((users) => ({
        id: users.Id,
        value: users.FirstName,
      }));
    });
  }

  openModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  async createContract(newContract: Contracts): Promise<boolean> {
    const response = await this.contractService
      .postContractFormdetails(newContract)
      .toPromise();
    this.data = response;
    this.contractId = this.data.Id;
    return true;
  }
  category!: string;
  handleCategoryClick(category: any) {
    this.openModal('static-modal');
    this.category = category.value;
    this.checkAdditionalFields(category.id);
    this.newContract.CategoryId = category.id;
  }

  checkAdditionalFields(id: any) {
    this.contractService.getAddtionalFields(id).subscribe((response) => {
      this.additionalFields = response;
      if (this.additionalFields.length != 0) {
        this.FieldStepper = 6;
        this.steps = 6;
      }
      if (this.additionalFields.length == 0) {
        this.FieldStepper = 5;
        this.steps = 5;
      }
    });
  }

  contractId!: number;
  formatdata!: additionalFields[];
  data: any;

  async onAdditionalSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      const contractCreated = await this.createContract(this.newContract);
      const formatedData: additionalFields[] = this.additionalFields.map(
        (field: any) => ({
          ContractId: this.contractId,
          AdditionalFieldId: field.AdditionalFieldId,
          Value: field.inputValue || '',
        })
      );
      this.postAdditionalFields(formatedData);
      if (this.currentstep < this.steps) {
        this.currentstep++;
      }
      await this.delay(2000);
      this.closeModal('additional-field-modal');
    }
  }

  // showSuccess() {
  //   this.toase.success('Submitted Successfully!');
  // }
  // showSuccess() {
  //   const toastrConfig: Partial<IndividualConfig> = {
  //     positionClass: 'top' === 'top' ? 'toast-top-right' : 'toast-bottom-right',
  //     toastClass: 'ngx-toastr ',
  //     titleClass:'ngx-toastr  toast-success ',

  //   };

  //   this.toastr.success('Submitted Successfully!', '', toastrConfig);

  // }
  // showSuccess() {
  //   const toastrConfig: Partial<IndividualConfig> = {
  //     positionClass: 'top' === 'top' ? 'toast-top-right' : 'toast-bottom-right',
  //     toastClass: 'ngx-toastr toast-success',
  //     titleClass: 'ngx-toastr toast-success toast-title',
  //   };

  //   this.toastr.success('Success message', 'Title', toastrConfig);
  // }

  // showSuccess(){
  //   const toastrConfig: Partial<IndividualConfig> = {
  //     positionClass: 'toast-top-right',
  //     toastClass: 'ngx-toastr toast-success custom',
  //     titleClass: 'ngx-toastr toast-success toast-title custom',
  //   };

  //   this.toastr.success("text", "title", {"iconClass": 'customer-info'});
  // }

  // showSuccess() {
  //   this.toastr.success('Success message', 'Title', {
  //     positionClass: 'toast-top-right',
  //     toastClass: 'toast-success custom-toast',
  //     titleClass: 'toast-title',
  //     messageClass: 'toast-message',

  //   });
  // }

  // showSuccess() {
  //   const toastrConfig: Partial<IndividualConfig> = {
  //     positionClass: 'toast-top-right',
  //     toastClass: 'toast-success',
  //     titleClass: 'toast-title',
  //   };

  //   this.toastr.success('Success message', 'Title', toastrConfig);
  // }

  async onAdditionalSubmitt(form: NgForm): Promise<void> {
    if (form.valid) {
      const formatdata: additionalFields[] = this.additionalFields.map(
        (field: any) => ({
          ContractId: this.contractId,
          AdditionalFieldId: field.AdditionalFieldId,
          Value: field.inputValue || '',
        })
      );
      if (formatdata !== null) {
        this.createContract(this.newContract);
      } else {
        alert('invalid');
      }
    }
  }
  submitField(field: {
    AdditionalFieldId: number;
    Value: string;
    inputValue?: string;
  }): void {
    const formattedField: additionalFields = {
      ContractId: this.contractId,
      AdditionalFieldId: field.AdditionalFieldId,
      Value: field.inputValue || '',
    };
  }
  postAdditionalFields(data: additionalFields[]) {
    this.contractService.postAdditionalField(data).subscribe((response) => {});
  }
  submitted = false;
  change!: string;
  validateAndProceed(currentModalId: string, nextModalId: string): void {
    this.submitted = true;
    if (this.isCurrentModalValid(currentModalId)) {
      const currentModal = document.getElementById(currentModalId);
      const nextModal = document.getElementById(nextModalId);
      if (currentModalId == 'datee-modal') {
        this.change = 'submit';
      }
      if (currentModal && nextModal) {
        currentModal.classList.add('hidden');
        nextModal.classList.remove('hidden');
        nextModal?.classList.add('flex');
      }
      if (this.currentstep < this.steps) {
        this.currentstep++;
      }
      this.submitted = false;
    }
  }

  previous(currentModalId: string, nextModalId: string): void {
    const currentModal = document.getElementById(currentModalId);
    const nextModal = document.getElementById(nextModalId);
    currentModal?.classList.add('hidden');
    nextModal?.classList.remove('hidden');
    nextModal?.classList.add('flex');
    if (this.currentstep > 0) {
      this.currentstep--;
    }
  }

  closeModal(modalId: string) {
    // this.ngOnInit();

    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  isCurrentModalValid(modalId: string): boolean {
    switch (modalId) {
      case 'static-modal':
        return (
          this.newContract.Account !== null &&
          this.newContract.Client !== null &&
          this.newContract.Project !== null &&
          this.newContract.UniqueNo !== null &&
          this.newContract.CategoryId !== null
        );
      case 'default-modal':
        return (
          this.newContract.CounterPartyOwner !== null &&
          this.newContract.CounterParty !== null &&
          this.newContract.BuissenessOWnerId !== null &&
          this.newContract.LegalOwnerId !== null
        );
      case 'formdetails-modal':
        return (
          this.newContract.FormsId !== null &&
          this.newContract.TypeId !== null &&
          this.newContract.StatusId !== null &&
          this.newContract.Version !== null &&
          this.newContract.Filename !== null &&
          this.newContract.Link !== null
        );
      case 'status-modal':
        return (
          this.newContract.ContractCode !== null &&
          this.newContract.Value !== null &&
          this.newContract.LiabilitiesCap !== null &&
          this.newContract.Jurisdiction !== null &&
          this.newContract.AutoRenewal !== null
        );
      case 'datee-modal':
        return (
          this.newContract.RenewalDateFlagOff !== null &&
          this.newContract.SigningDate !== null &&
          this.newContract.StartingDate !== null &&
          this.newContract.TerminationDate !== null &&
          this.newContract.ExpirationLimitId !== null
        );
      default:
        return true;
    }
  }

  opennmodal() {
    this.openModal('static-modal');
  }

  currentstep = 0;
  FieldStepper: number = 5;
  steps = 5;

  selectedStatus: any;
  onStatusChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.handleStatusChange(selectedValue);
  }

  handleStatusChange(statusId: any | null): void {
    this.checkAdditionalFields(statusId);
    this.newContract.CategoryId = statusId;
  }

  onStatusChangee(): void {
    this.handleStatusChange(this.selectedStatus.id);
    this.category = this.selectedStatus.value;
  }
}
