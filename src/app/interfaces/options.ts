import { DecimalPipe, Time } from '@angular/common';

export interface Options {
  Id: number;
  Key: string;
  Value: string;
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
    Staus: string|null,
    CounterParty :string,
    Account :string|null,
    Client :string,
    Project:string,
    CounterPartyOwner:string,



    SigningDate:Date,
    StartingDate :Date,
    TerminationDate:Date,
    RenewalDateFlagOff :boolean,
    Value:number|null,
    Jurisdiction :string,
    LiabilitiesCap :number,

    Notes :string,
    OpenIssues :string,

    Link: string,
    AutoRenewal :boolean,
    ContractCode :string,
    Filename :File|null,
    StatusId:number|null,
}

