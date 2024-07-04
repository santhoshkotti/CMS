import { DecimalPipe, Time } from "@angular/common"

export interface Options{
        Id:number,
        Key:string,
        Value:string
    }

export interface Users{
    Id :number,
    FirstName :string,
    LastName :string,
    Email:string,
    HashPassword :string   
}

export interface Contracts {
    Id :number,
    UniqueNo :number,
    Version :number,
    Current :boolean,  

    CounterParty :string,
    Account :string,
    Client :string,
    Project:string,
    CounterPartyOwner:string,

   
    SigningDate:Date,
    StartingDate :Date,
    TerminationDate:Date,
    RenewalDateFlagOff :boolean,
    Value:number,
    Jurisdiction :string,
    LiabilitiesCap :number,
    
    Notes :string,
    OpenIssues :string,
    
    Link: string,
    AutoRenewal :boolean,
    ContractCode :number,
    Filename :string  
}

