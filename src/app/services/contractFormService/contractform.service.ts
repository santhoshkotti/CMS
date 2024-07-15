import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contracts } from 'src/app/interfaces/options';

@Injectable({
  providedIn: 'root',
})
export class ContractformService {
  private apiUrl = 'http://127.0.0.1:3001';
  constructor(private http: HttpClient) {}

  getContractFormdetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contracts`);
  }

  postContractFormdetails(newContract: Contracts): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, newContract);
  }

  deleteContract(contractId: number): Observable<void> {
    const url = `${this.apiUrl}/${contractId}`;
    return this.http.delete<void>(url);
  }

  // getContractAdditionalFields(contractId: number, AdditionalFieldId: number) {
  //   return this.http.get<any[]>(
  //     `http://127.0.0.1:5000/contract-additional-fields-values/${contractId}/${AdditionalFieldId}`
  //   );
  // }

  // getAdditionalFieldNames(categoryId: number) {
  //   return this.http.get<any[]>(
  //     `http://127.0.0.1:5000/categoryadditionalfeildnames/${categoryId}`
  //   );
  // }
  getContractAdditionalFieldsValues(contractId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/contract-additional-fields-values/${contractId}`
    );
  }
}
