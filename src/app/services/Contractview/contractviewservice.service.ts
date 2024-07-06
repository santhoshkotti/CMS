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
}
