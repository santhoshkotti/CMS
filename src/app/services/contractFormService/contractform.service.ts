import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { additionalFields, Contracts } from 'src/app/interfaces/options';

@Injectable({
  providedIn: 'root',
})
export class ContractformService {
 private apiUrl = "http://127.0.0.1:3001/contracts";
 private baseUrl = "http://127.0.0.1:3001/";
 private addtionalUrl = "http://127.0.0.1:3001/contract-additional-fields-values";
  constructor(private http:HttpClient) { }

  getContractFormdetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  postContractFormdetails(newContract: Contracts): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, newContract);
  }

  deleteContract(contractId: number): Observable<void> {
    const url = `${this.apiUrl}/${contractId}`;
    return this.http.delete<void>(url);
  }

  //to get the list of contracts
  getContractTypes():Observable<any[]>{
    return this.http.get<any[]>("http://127.0.0.1:3001/options");
  }

  //to get the types
  getTypes():Observable<any[]>{
    return this.http.get<any[]>("http://127.0.0.1:3001/types");
  }

    //to get the users for dummy data of legalowner and buissness owner
    getUserForOwners():Observable<any[]>{
      return this.http.get<any[]>('http://127.0.0.1:3001/users');
    }

  //to get the list of additional fields of contracts
  getAddtionalFields(contractId:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/categoryadditionalfeildnames/${contractId}`);
  }



  //to add the additional fields based on the contract id and additional field id
   postAdditionalField(additionalFiels:additionalFields[]):Observable<any[]>{
    console.log("hello",additionalFiels);
    return this.http.post<any[]>(this.addtionalUrl,additionalFiels);
   }

   getContractAdditionalFieldsValues(contractId: number):Observable<any[]> {
    // return this.http.get<any[]>(`${this.baseUrl}/contract-additional-fields-values/${contractId}`);
    return this.http.get<any[]>(`${this.baseUrl}categoryadditionalfeildnames/${contractId}`);

  }
}
