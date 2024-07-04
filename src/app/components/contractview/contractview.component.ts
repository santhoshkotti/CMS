import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contractview',
  templateUrl: './contractview.component.html',
  styleUrls: ['./contractview.component.css'],
})
export class ContractviewComponent implements OnInit {
  activeSection: string = 'focus'; // Default active section
  selectedContract: any;
  responseContracts = [
    {
      Id: 1,
      UniqueNo: 'Yes',
      Version: 1.0,
      Current: true,
      CategoryId: 'Financial Contracts',
      TypeId: 'Statement of work',
      CounterParty: 'Synechron',
      Account: 'Synechron',
      Client: 'PNC',
      Project: 'Midland',
      CounterPartyOwner: 'Brij Goyal',
      LegalOwner: 'Srinivasan Damodaran',
      BusinessOwner: 'Srinivasan Damodaran',
      StatusId: 'Fully signed',
      SigningDate: '2024-05-14',
      StartingDate: '2024-05-01',
      TerminationDate: '2024-10-31',
      Value: 50000.0,
      Jurisdiction: 'Pune, India',
      Notes: ['SOW for Mid Land Loan Services'],
      OpenIssues: ['Billing Yet to start'],
      FormId: 'Paper/esigning',
      AutoRenewal: true,
      ContractCode: 'SYN_PNC_MID_01',
      Filename: 'SOW.pdf',
      DurationYears: 0.5,
      AnnualizedValue: 0,
      TotalValueCategory: '#REF!',
      TotalAnnualizedValueCategory: '#REF!',
    },
    {
      Id: 2,
      UniqueNo: 'XYZ456',
      Version: 2.0,
      Current: true,
      CategoryId: 'Sample Category 2',
      TypeId: 'Sample Type 2',
      CounterParty: 'Company B',
      Account: 'Account 456',
      Client: 'Client Y',
      Project: 'Project Z',
      CounterPartyOwner: 'Jane Doe',
      LegalOwner: 'Legal Owner 2',
      BusinessOwner: 'Business Owner 1',
      StatusId: 'Pending',
      SigningDate: '2024-07-01',
      StartingDate: '2024-07-02',
      TerminationDate: '2025-07-01',
      Value: 8000.0,
      Jurisdiction: 'California',
      Notes: ['This is another sample contract.'],
      OpenIssues: ['Pending review'],
      FormId: 'Form 18',
      AutoRenewal: true,
      ContractCode: 'CONTRACT-002',
      Filename: 'contract2.pdf',
      DurationYears: 1,
      AnnualizedValue: 8000,
      TotalValueCategory: '#REF!',
      TotalAnnualizedValueCategory: '#REF!',
    },
    {
      Id: 3,
      UniqueNo: 'PQR789',
      Version: 1.5,
      Current: true,
      CategoryId: 'Sample Category 3',
      TypeId: 'Sample Type 1',
      CounterParty: 'Company C',
      Account: 'Account 789',
      Client: 'Client Z',
      Project: 'Project W',
      CounterPartyOwner: 'Sarah Lee',
      LegalOwner: 'Legal Owner 1',
      BusinessOwner: 'Business Owner 3',
      StatusId: 'Awaiting Feedback',
      SigningDate: '2024-07-02',
      StartingDate: '2024-07-03',
      TerminationDate: '2025-07-02',
      Value: 10000.0,
      Jurisdiction: 'Texas',
      Notes: ['This is a third sample contract.', 'note 2'],
      OpenIssues: ['Awaiting feedback', 'issue2', 'issue3'],
      FormId: 'Form 16',
      AutoRenewal: true,
      ContractCode: 'CONTRACT-003',
      Filename: 'contract3.pdf',
      DurationYears: 1,
      AnnualizedValue: 10000,
      TotalValueCategory: '#REF!',
      TotalAnnualizedValueCategory: '#REF!',
    },
    {
      Id: 4,
      UniqueNo: 'LMN012',
      Version: 3.0,
      Current: true,
      CategoryId: 'Sample Category 4',
      TypeId: 'Sample Type 2',
      CounterParty: 'Company D',
      Account: 'Account 012',
      Client: 'Client W',
      Project: 'Project X',
      CounterPartyOwner: 'Michael Brown',
      LegalOwner: 'Legal Owner 2',
      BusinessOwner: 'Business Owner 2',
      StatusId: 'None',
      SigningDate: '2024-07-03',
      StartingDate: '2024-07-04',
      TerminationDate: '2025-07-03',
      Value: 12000.0,
      Jurisdiction: 'Florida',
      Notes: ['This is another sample contract.'],
      OpenIssues: ['None'],
      FormId: 'Form 17',
      AutoRenewal: true,
      ContractCode: 'CONTRACT-004',
      Filename: 'contract4.pdf',
      DurationYears: 1,
      AnnualizedValue: 12000,
      TotalValueCategory: '#REF!',
      TotalAnnualizedValueCategory: '#REF!',
    },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/contracts').subscribe(
      (contracts) => {
        this.responseContracts = contracts;
        this.calculateAnnualizedValue();
        this.selectedContract = this.responseContracts[0];
      },
      (error) => {
        console.error('Error fetching contracts:', error);
        // Handle error as needed
      }
    );
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
  }
}
