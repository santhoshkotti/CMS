import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContractviewserviceService {
  constructor(private http: HttpClient) {}

  getContracts() {
    return this.http.get<any[]>('http://127.0.0.1:5000/contracts');
  }

  getContractAdditionalFields(contractId: number, AdditionalFieldId: number) {
    return this.http.get<any[]>(
      `http://127.0.0.1:5000/contract-additional-fields-values/${contractId}/${AdditionalFieldId}`
    );
  }

  getAdditionalFieldNames(categoryId: number) {
    return this.http.get<any[]>(
      `http://127.0.0.1:5000/categoryadditionalfeildnames/${categoryId}`
    );
  }
}
