import { ContractformService } from './../../services/contractFormService/contractform.service';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Contracts } from 'src/app/interfaces/options';

@Component({
  selector: 'app-form-contract',
  templateUrl: './form-contract.component.html',
  styleUrls: ['./form-contract.component.css']
})
export class FormContractComponent {

  financialContractForm!: FormGroup;

  newContract!:Contracts;

  constructor(private fb: FormBuilder,private contractservice:ContractformService) {
    this.newContract = {
    Staus:'',
    StatusId:13,
    Id: 0,
    UniqueNo:null,
    Version: null,
    Current: true,
    CounterParty: '',
    Account: '',
    Client: '',
    Project: '',
    CounterPartyOwner: '',
    SigningDate:new Date(),
    StartingDate: new Date(),
    TerminationDate: new Date(),
    RenewalDateFlagOff: false,
    Value: null,
    Jurisdiction:'',
    LiabilitiesCap: 0,
    Notes: 'This is another sample Contract',
    OpenIssues: 'None',
    Link: 'https://example.com/contract5',
    AutoRenewal: false,
    ContractCode: '',
    Filename: null
    }

  }

  ngOnInit(): void {
    this.financialContractForm = this.fb.group({
      account: ['', Validators.required],
      client: ['', [Validators.required]],
      project: ['', Validators.required],
      form: ['', Validators.required],
      counterPartyOwner: ['', Validators.required],
      businessOwner: ['', Validators.required],
      legalOwner: ['', Validators.required],
      signingDate: ['', Validators.required],
      terminationDate: ['', Validators.required],
      renewalFlagOffDate: ['', Validators.required],
      startingDate: ['', Validators.required],
      noticeDate: ['', Validators.required],
    });

    // this.getContracts();
    this.deleteContract(5);
    // this.createContract();
  }

  printFormData() {
    console.log(this.financialContractForm.value);
  }

  onSubmit(){
    console.log(this.financialContractForm.value);
    console.log("monnies");
    console.log(this.newContract);
    this.createContract(this.newContract);
  }

  getContracts() {
    this.contractservice.getContractFormdetails().subscribe(response => {

      console.log('Contracts retrieved:', response);
    });
  }
  // newContract: Contracts = {
  //   Id: 0,
  //   UniqueNo: 'MKL123',
  //   Version: 1.0,
  //   Current: true,
  //   CounterParty: 'Prime Soft',
  //   Account: 'Account 012',
  //   Client: 'Client X',
  //   Project: 'Project K',
  //   CounterPartyOwner: 'JOHNO DOE',
  //   SigningDate: new Date('12/2/2024'),
  //   StartingDate: new Date('7/3/2024'),
  //   TerminationDate: new Date('12/8/2024'),
  //   RenewalDateFlagOff: false,
  //   Value: 12000,
  //   Jurisdiction: 'FLORIDA',
  //   LiabilitiesCap: 25000,
  //   Notes: 'This is another sample Contract',
  //   OpenIssues: 'None',
  //   Link: 'https://example.com/contract4',
  //   AutoRenewal: false,
  //   ContractCode: 'CONTRACT-005',
  //   Filename: 'contract4.pdf'
  // };





  createContract(newContraact:Contracts) {
    this.contractservice.postContractFormdetails(newContraact).subscribe(response => {
      console.log('Contract created:', response);
      this.getContracts(); // Refresh the list of contracts after creating a new one
    });
  }

  deleteContract(contractId: number) {
    this.contractservice.deleteContract(contractId).subscribe(() => {

    });
  }

}
