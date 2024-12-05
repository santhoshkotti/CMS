import { additionalFields, Contracts } from './../../interfaces/options';
import { ContractformService } from './../../services/contractFormService/contractform.service';
import { Component } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Options,} from 'src/app/interfaces/options';
import { NgModel } from '@angular/forms';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-form-contract',
  templateUrl: './form-contract.component.html',
  styleUrls: ['./form-contract.component.css']
})
export class FormContractComponent {
  responseOptions:Options[]=[];
  newContract!: Contracts ;
  additionalFields:any;

  constructor(private fb: FormBuilder,private contractservice:ContractformService) {
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

  }
  ngOnInit(): void {
    this.getContractsTypes();
    this.getTypes();
    this.getUsers();
  }
  onSubmit(){
    if(!this.additionalFields){
      this.createContract(this.newContract);
    }
  }

  categoriess:{id:number,value:string}[]=[];
  status:{id:number,value:string}[]=[];
  forms:{id:number,value:string}[]=[];
  types:{id:number,value:String}[]=[];
  expirationLimit:{id:number,value:String}[]=[];
  usersOwners:{id:number,value:string}[]=[];
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

      this.openModal('contracttypes-modal');
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

}
