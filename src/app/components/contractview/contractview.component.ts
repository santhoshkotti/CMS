import { Options } from './../../interfaces/options';
import { ContractformService } from './../../services/contractFormService/contractform.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { Contracts } from 'src/app/interfaces/options';

@Component({
  selector: 'app-contractview',
  templateUrl: './contractview.component.html',
  styleUrls: ['./contractview.component.css'],
})
export class ContractviewComponent implements OnInit {
  activeSection: string = 'focus'; // Default active section
  selectedContract!:Contracts;
  responseContracts: any[] = []; // Initialize empty array
  additionalFields: any[] = []; // Initialize additionalFields as an empty array
  additionalFieldNames: any[] = [];
  combinedAdditionalFields: any[] = []; // Combined array of additional fields with names

  constructor(
    private http: HttpClient,
    private contractService: ContractformService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ngOnInit(): void {
  //   this.contractService.getContracts().subscribe(
  //     (contracts) => {
  //       this.responseContracts = contracts;
  //       this.calculateAnnualizedValue();
  //       if (this.responseContracts.length > 0) {
  //         this.selectedContract = this.responseContracts[0]; // Set default selection
  //         this.loadAdditionalFields(this.selectedContract.Id);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching contracts:', error);
  //       // Handle error as needed
  //     }
  //   );
  // }
  ngOnInit(): void {
    this.getContractsTypes();
    this.route.queryParams.subscribe((params) => {
      const contractId = params['contractId'];

      this.contractService.getContractFormdetails().subscribe(
        (contracts) => {
          this.responseContracts = contracts;
          this.calculateAnnualizedValue();

          if (contractId) {
            this.selectedContract = this.responseContracts.find(
              (contract) => contract.Id === +contractId
            );
          }

          if (!this.selectedContract) {
            this.selectedContract = this.responseContracts[0]; // Set default selection
          }

          this.loadAdditionalFields(this.selectedContract.Id);
          alert("hello"+this.selectedContract.Id);
        },
        (error) => {
          console.error('Error fetching contracts:', error);
          // Handle error as needed
        }
      );
    });
  }

  private calculateAnnualizedValue(): void {
    this.responseContracts.forEach((contract) => {
      contract.AnnualizedValue = contract.Value / contract.DurationYears;
    });
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  onContractChange(event: any): void {
    const selectedId = +event.target.value;
    this.selectedContract = this.responseContracts.find(
      (contract) => contract.Id === selectedId
    );
    this.loadAdditionalFields(selectedId);
  }

  // private loadAdditionalFields(contractId: number): void {
  //   this.contractService.getAdditionalFieldNames(contractId).subscribe(
  //     (additionalFields) => {
  //       console.log('API Response - Additional Fields:', additionalFields); // Log API response
  //       this.additionalFields = Array.isArray(additionalFields)
  //         ? additionalFields
  //         : []; // Ensure additionalFields is an array
  //       console.log('Additional Fields:', this.additionalFields);

  //       // Check if CategoryId exists and load additional field names
  //       if (this.selectedContract && this.selectedContract.CategoryId) {
  //         // Iterate through additionalFields and make API calls
  //         this.additionalFields.forEach((field) => {
  //           this.contractService
  //             .getContractAdditionalFields(contractId, field.AdditionalFieldId)
  //             .subscribe(
  //               (additionalFieldData) => {
  //                 console.log(
  //                   'API Response - Additional Field Data:',
  //                   additionalFieldData
  //                 ); // Log API response
  //                 // Add fetched data to additionalFieldNames
  //                 this.additionalFieldNames.push({
  //                   additionalFieldData, // Assuming 'Value' is the relevant property from the response
  //                 });
  //                 console.log(
  //                   'Updated Additional Field Names:',
  //                   this.additionalFieldNames
  //                 );

  //                 // Combine additional fields with names
  //                 this.combineAdditionalFields();
  //               },
  //               (error) => {
  //                 console.error(
  //                   Error fetching additional field data for AdditionalFieldId ${field.AdditionalFieldId}:,
  //                   error
  //                 );
  //               }
  //             );
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching additional fields:', error);
  //     }
  //   );
  // }

  // private combineAdditionalFields(): void {
  //   this.combinedAdditionalFields = [];

  //   // Flatten the additionalFieldData structure to simplify matching
  //   const flattenedData = this.additionalFieldNames.map((item) => ({
  //     AdditionalFieldId: item.additionalFieldData.AdditionalFieldId,
  //     Value: item.additionalFieldData.Value,
  //   }));

  //   this.additionalFields.forEach((field) => {
  //     const matchingName = flattenedData.find(
  //       (name) => name.AdditionalFieldId === field.AdditionalFieldId
  //     );
  //     if (matchingName) {
  //       this.combinedAdditionalFields.push({
  //         AdditionalFieldId: field.AdditionalFieldId,
  //         Value: matchingName.Value,
  //         FieldName: field.Value,
  //       });
  //     }
  //   });

  //   console.log('Combined Additional Fields:', this.combinedAdditionalFields);
  // }
  private loadAdditionalFields(contractId: number): void {
    this.contractService
      .getContractAdditionalFieldsValues(contractId)
      .subscribe(
        (additionalFields) => {
          console.log('API Response - Additional Fields:', additionalFields); // Log API response
          this.combinedAdditionalFields = Array.isArray(additionalFields)
            ? additionalFields
            : []; // Ensure additionalFields is an array
          console.log(
            'Combined Additional Fields:',
            this.combinedAdditionalFields
          );
        },
        (error) => {
          console.error('Error fetching additional fields:', error);
        }
      );
  }

  editable:boolean=true;
  edit(){
   this.editable=false;
  }

  categoriess:{id:number,value:string}[]=[];
  status:{id:number,value:string}[]=[];
  forms:{id:number,value:string}[]=[];
  types:{id:number,value:String}[]=[];
  expirationLimit:{id:number,value:String}[]=[];
  usersOwners:{id:number,value:string}[]=[];
  responseOptions:Options[]=[];
  getContractsTypes() {
    this.contractService.getContractTypes().subscribe(response => {
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

}
