import { DecimalPipe, Time } from '@angular/common';

export interface Options {
  Id: number;
  Key: string;
  Value: string;
}

export interface FieldsIn {
  AdditionalFieldId: number;
  CategoryId: number;
}

export interface Users{
    Id :number,
    FirstName :string,
    LastName :string,
    Email:string,
    HashPassword :string
}
export interface PermissionPayload {
  RoleId: number;
  CategoryId: number;
  PermissionId: number;
  CreatedBy: number;
  CreatedAt: string;
  UpdatedBy: number;
  UpdatedAt: string;
}

export interface UserRole {
  UserId: number;
  RoleId: number;
  CreatedBy: number;
  CreatedAt: string;
  UpdatedBy: number;
  UpdatedAt: string;
}

export interface Contracts {
    Id :number,
    UniqueNo:string|null,
    // UniqueNo :number,
    Version :number|null,
    Current :boolean|null,
    // Staus: string|null,
    CategoryId:number|null,
    TypeId:number|null,
    CounterParty :string,
    Account :string|null,
    Client :string,
    Project:string,
    CounterPartyOwner:string,
    LegalOwnerId:number|null,
    BuissenessOWnerId:number|null,
    StatusId:number|null,
    SigningDate:Date|null,
    StartingDate :Date|null,
    TerminationDate:Date|null,
    RenewalDateFlagOff :boolean|null,
    Value:number|null,
    Jurisdiction :string,
    LiabilitiesCap :number|null,
    ExpirationLimitId:Number|null,
    Notes :string,
    OpenIssues :string,
    FormsId:number|null,
    Link: string,
    AutoRenewal :boolean|null,
    ContractCode :string,
    Filename :File|null,

}



export interface additionalFields{
  ContractId:number,
  AdditionalFieldId:number,
  Value:string

}

export interface Category {
  id: number,
  value: string
}


//combinedata

export interface CombinedData {
  Id: number;
  UniqueNo: string;
  Version: string;
  Current: boolean;
  CategoryId: number;
  Category: string;
  TypeId: number;
  CounterParty: string;
  Account: string;
  Client: string;
  Project: string;
  CounterPartyOwner: string;
  LegalOwnerId: number;
  BuissenessOWnerId: number;
  StatusId: number;
  SigningDate: Date;
  StartingDate: string;
  TerminationDate: string;
  RenewalDateFlagOff: boolean;
  Value: number;
  Jurisdiction: string;
  LiabilitiesCap: number;
  ExpirationLimitId: number;
  Notes: string;
  OpenIssues: string;
  FormId: number;
  Link: string;
  AutoRenewal: boolean;
  ContractCode: string;
  Filename: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedAt: string;
  Status:string
}




