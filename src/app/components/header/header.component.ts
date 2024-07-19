import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { additionalFields, Contracts, Options } from 'src/app/interfaces/options';
import { ContractformService } from 'src/app/services/contractFormService/contractform.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // contractTypes = [
  //   'Financial Contract',
  //   'Employee Agreement',
  //   'Business Contract',
  //   'ThirdParty Contract',
  // ];

  // isDropdownOpen = false;

  // toggleDropdown() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }

  isDropdownOpen = false;
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  isFlyoutMenuVisible = false;

  toggleFlyoutMenu() {
    this.isFlyoutMenuVisible = !this.isFlyoutMenuVisible;
  }

  newContract!: Contracts ;
  additionalFields:any;

  constructor(private fb: FormBuilder,private contractservice:ContractformService,private router:Router,private render:Renderer2,private el:ElementRef) {
    this.newContract = {
    Id: 0,
    UniqueNo:null,
    Version: null,
    Current: true,
    CategoryId:null,
    TypeId:null,
    CounterParty: '',
    Account: '',
    Client: '',
    Project: '',
    CounterPartyOwner: '',
    LegalOwnerId:null,
    BuissenessOWnerId:null,
    StatusId:null,
    SigningDate:null,
    StartingDate: null,
    TerminationDate: null,
    RenewalDateFlagOff: null,
    Value: null,
    Jurisdiction:'',
    LiabilitiesCap: null,
    Notes: 'This is another sample Contract',
    OpenIssues: 'None',
    ExpirationLimitId:null,
    FormsId:null,
    Link: 'https://example.com/contract5',
    AutoRenewal:null ,
    ContractCode: '',
    Filename: null
    }

    this.render.listen('window', 'click', (e: Event) => {
      if (this.isDropdownOpen && !this.el.nativeElement.contains(e.target)) {
        this.isDropdownOpen = false;
      }
    });

  }

  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }


  ngOnInit(): void {
    this.getContractsTypes();
    this.getTypes();
    this.getUsers();
    initFlowbite();

  }

  onSubmit(){
    if(!this.additionalFields){
      this.createContract(this.newContract);
    }
  }

  navigateToFormContract(category: string): void {
    this.router.navigate(['/formcontract'], {
      queryParams: { contractType: category },
    });
  }


  categoriess:{id:number,value:string}[]=[];
  status:{id:number,value:string}[]=[];
  forms:{id:number,value:string}[]=[];
  types:{id:number,value:String}[]=[];
  expirationLimit:{id:number,value:String}[]=[];
  usersOwners:{id:number,value:string}[]=[];
  responseOptions:Options[]=[];
  getContractsTypes() {
    this.contractservice.getContractTypes().subscribe(response => {
      this.responseOptions = response;
      this.categoriess = response.filter(option => option.Key === 'Category')
                    .map(option => ({id:option.Id,value:option.Value}));

      this.status = response.filter(option => option.Key=== 'Status')
                    .map(option=>({id:option.Id,value:option.Value}));

      this.forms = response.filter(option => option.Key === 'Forms' )
                   .map(option=>({id:option.Id,value:option.Value}));

      this.expirationLimit = response.filter(option => option.Key === 'ExpirationLimit')
                    .map(option=>({id:option.Id,value:option.Value}));

    });

  }


  getTypes(){
    this.contractservice.getTypes().subscribe(response=>{
     this.types = response.map(type=>({
       id:type.Id,
       value:type.Name
     }))
    })
 }
 getUsers(){
   this.contractservice.getUserForOwners().subscribe(response=>{
     console.log("Aaa",response);
      this.usersOwners = response.map(users=>({
        id:users.Id,
        value:users.FirstName
      }))
   })
 }

 openModal(modalId: string) {
   const modal = document.getElementById(modalId);
   if (modal) {
     modal.classList.remove('hidden');
     modal.classList.add('flex');
   }
 }

//  async createContract(newContraact:Contracts):Promise<boolean> {
//     this.contractservice.postContractFormdetails(newContraact).subscribe(response => {
//       this.data = response;
//       this.contractId = this.data.Id;
//       alert("contractid"+this.contractId);


//     });



//   return true;
//   }
async createContract(newContract: Contracts): Promise<boolean> {

   const response = await this.contractservice.postContractFormdetails(newContract).toPromise();
   this.data = response;
   this.contractId = this.data.Id;
   alert("contractId: " + this.contractId);
   return true;

}
 category!:string;
 clickk(){
  alert("modal");
 }
 handleCategoryClick(category: any) {
  
   this.openModal('static-modal');
   this.category = category.value;
   this.checkAdditionalFields(category.id);
   this.newContract.CategoryId=category.id;

 }

 checkAdditionalFields(id:any){
   this.contractservice.getAddtionalFields(id).subscribe(response=>{
         this.additionalFields = response;
   });
 }

 contractId!: number ;
 formatdata!:additionalFields[];
 data:any;

 sendData(additionalFields:any){
 alert("hello");
 }
 async onAdditionalSubmit(form: NgForm): Promise<void> {
   const contractCreated = await this.createContract(this.newContract);

   if(contractCreated){
     alert(this.contractId);
   }

     if (form.valid) {
       const formatedData: additionalFields[] = this.additionalFields.map((field: any) => ({
         ContractId: this.contractId,
         AdditionalFieldId: field.AdditionalFieldId,
         Value: field.inputValue || ''
       }));

        console.log("formateddata",formatedData);
         alert("Inside additional fields processing");
         this.postAdditionalFields(formatedData);
         this.closeModal('additional-field-modal');

     }

 }
async onAdditionalSubmitt(form: NgForm): Promise<void>{
 //  const id = this.createContract(this.newContract);
 // await this.createContract(this.newContract);
 //     alert(this.contractId);
   if (form.valid) {
    const formatdata:additionalFields[] = this.additionalFields.map((field:any) => ({
     ContractId: this.contractId,
     AdditionalFieldId: field.AdditionalFieldId,
     Value: field.inputValue || ''
   }));
   if(formatdata!==null){

   this.createContract(this.newContract);

     //   alert("additinal kulla iruku");
     //  this.postAdditionalFields(formateddata);

     // this.closeModal('additional-field-modal');

 }
 else{
   alert("invalid");
 }
  }
 }
 submitField(field: { AdditionalFieldId: number, Value: string, inputValue?: string }): void {
   const formattedField: additionalFields = {
     ContractId: this.contractId,
     AdditionalFieldId: field.AdditionalFieldId,
     Value: field.inputValue || ''
   };
 }
 postAdditionalFields(data:additionalFields[]){

   this.contractservice.postAdditionalField(data).subscribe(response=>{
    });
 }
 submitted=false;
change!:string;

 validateAndProceed(currentModalId: string, nextModalId: string): void {
   this.submitted = true; // Set the submitted flag to true
   if (this.isCurrentModalValid(currentModalId)) {
     const currentModal = document.getElementById(currentModalId);
     const nextModal = document.getElementById(nextModalId);
     if(currentModalId == "datee-modal" ){
        this.change='submit';
     }
     if (currentModal && nextModal) {
       currentModal.classList.add('hidden');
       nextModal.classList.remove('hidden');
       nextModal?.classList.add('flex');
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
 }

 closeModal(modalId: string) {
   this.ngOnInit();
   const modal = document.getElementById(modalId);
   if (modal) {
     modal.classList.add('hidden');
     modal.classList.remove('flex');
   }
 }

 isCurrentModalValid(modalId: string): boolean {
   switch (modalId) {
     case 'static-modal':
       return this.newContract.Account!==null && this.newContract.Client!==null && this.newContract.Project!==null && this.newContract.UniqueNo!==null && this.newContract.CategoryId!==null;
     case 'default-modal':
       return this.newContract.CounterPartyOwner!==null && this.newContract.CounterParty!==null && this.newContract.BuissenessOWnerId !== null && this.newContract.LegalOwnerId !== null;
     case 'formdetails-modal':
       return this.newContract.FormsId!==null && this.newContract.TypeId!==null && this.newContract.StatusId!==null && this.newContract.Version!==null && this.newContract.Filename!==null && this.newContract.Link!==null;
     case 'status-modal':
       return this.newContract.ContractCode!==null && this.newContract.Value!==null && this.newContract.LiabilitiesCap!==null&& this.newContract.Jurisdiction!==null&&this.newContract.AutoRenewal!==null;
     case 'datee-modal':
       return this.newContract.RenewalDateFlagOff!==null && this.newContract.SigningDate!==null && this.newContract.StartingDate!==null&& this.newContract.TerminationDate!==null && this.newContract.ExpirationLimitId!==null;
     default:
       return true;
   }
 }


 //shiva ts file

 params: string[] = [
  'category',
  'description',
  'done_outline',
  'timer',
  'manage_accounts',
  'security',
  'person_add',
  'add',
];

names: string[] = [
  'Category',
  'Forms',
  'Status',
  'ExpirationLimit',
  'Role',
  'Permissions',
  'Users',
  'AdditionalField',
];

descriptions: string[] = [
  'Manage categories',
  'Fill out forms',
  'Check status',
  'Set expiration limits',
  'Define roles',
  'Manage permissions',
  'Add users',
  'Add additional fields',
];

// Splitting the items into two columns
firstColumnItems = this.params.slice(0, 4);
secondColumnItems = this.params.slice(4);
firstColumnNames = this.names.slice(0, 4);
secondColumnNames = this.names.slice(4);
firstColumnDescriptions = this.descriptions.slice(0, 4);
secondColumnDescriptions = this.descriptions.slice(4);

dropdownOpen = false;


toggleDropdownn() {
  this.dropdownOpen = !this.dropdownOpen;
  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    if (this.dropdownOpen) {
      mainContent.classList.add('blur');
      document.addEventListener('click', this.closeDropdownOnOutsideClick);
    } else {
      mainContent.classList.remove('blur');
      document.removeEventListener('click', this.closeDropdownOnOutsideClick);
    }
  }
}

closeDropdownOnOutsideClick = (event: MouseEvent) => {
  const dropdown = document.querySelector('.relative');
  if (dropdown && !dropdown.contains(event.target as Node)) {
    this.dropdownOpen = false;
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
      mainContent.classList.remove('blur');
    }
    document.removeEventListener('click', this.closeDropdownOnOutsideClick);
  }
};

navigateToComponent(item: string) {
  this.dropdownOpen = false;
  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    mainContent.classList.remove('blur');
  }
  if (item === 'Users') {
    this.router.navigate(['/users']);
  } else {
    this.router.navigate(['/options'], { queryParams: { key: item } });
  }
}


}
// import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { initFlowbite } from 'flowbite';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent {

//   @ViewChild('modal') modal!: ElementRef;

//   isModalOpen!:boolean;
//   ngOnInit(){
//   //  this.isModalOpen=true;
//   }



//     contractTypes = [
//       "Financial Contract",
//       "Employee Agreement",
//       "Buisness Contract",
//       "ThirdParty Contract"
//     ];

//     // closeModal(): void {
//     //   this.isModalOpen=false;

//     // }
//     navigateToFormContract(category: string): void {
//       this.router.navigate(['/formcontract'], {
//         queryParams: { contractType: category },
//       });
//     }
// }


