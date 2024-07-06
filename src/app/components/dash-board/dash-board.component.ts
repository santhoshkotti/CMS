import { ContractformService } from './../../services/contractFormService/contractform.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contracts } from 'src/app/interfaces/options';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {

   constructor(private contractService:ContractformService){}
  ngOnInit(){
    this.onSubmit();
    this.getContracts();
  }
  demofiteredstring:string |null=null;
  filteredString :string | null=null;
  statusFilter:string |null=null;
  // inputPlaceholder: string = 'Enter text here...';
  dashboardDetails = [
    {  title: 'MidLand', status: 'ACTIVE',counterParty:'Synerchron',effectiveform:'05 Jan 2024',lastModifiedOn:'03 Mar 2024',contract:'Financial Contract' },
    {  title: 'PrimeSoft', status: 'Review Pending',counterParty:'Idp',effectiveform:'13 Apr 2024',lastModifiedOn:'13 Jun 2024',contract:'Employee Agreement' },
    {  title: 'Idp', status: 'Sign Expired',counterParty:'PrimeSoft',effectiveform:'13 Feb 2024',lastModifiedOn:'03 Mar 2024',contract:'Financial Contract' },
    {  title: 'Idp', status: 'ACTIVE',counterParty:'PrimeSoft',effectiveform:'13 Feb 2024',lastModifiedOn:'03 Mar 2024',contract:'Buisness Contract' },
    {  title: 'MidLand', status: 'Review Pending',counterParty:'PrimeSoft',effectiveform:'13 Feb 2024',lastModifiedOn:'03 Mar 2024',contract:'Employee Agreement' }
  ];

  countries = [ 'Financial Contract', 'Buisness Contract', 'Employee Agreement', 'Third-Party Serivces'];
  selectedCountry = new FormControl;
  isDropdownVisible: boolean = false;

  statuses: string[] = ['ACTIVE', 'Review Pending', 'Sign Expired'];


  onSubmit() {
   this.filteredString=this.demofiteredstring;
  }

  oncheck(a:string){

  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
   selectedStatus!:string
  filterByStatus(status: string) {
    this.selectedStatus = status;
    this.statusFilter = status;
    this.isDropdownVisible = false;
    alert(this.statusFilter);
    alert(this.filteredString);
  }


  showContract:Contracts[]=[];
  getContracts() {
    this.contractService.getContractFormdetails().subscribe(response => {
     alert("hello");
      console.log('Contracts retrieved:', response);
      this.showContract = response;
    });
  }

 






  ngAfterViewInit() {

  }

}
