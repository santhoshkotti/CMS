import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Options } from 'src/app/interfaces/options';

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  private apiUrl = 'http://127.0.0.1:3001/options';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  postData(category: Options): Observable<Options> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Options>(this.apiUrl, category, { headers });
  }

  // updateCategory(optionId: number, category: string): Observable<Options> {
  //   console.log(optionId,category+"in service")
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.put<Options>(`${this.apiUrl}/${optionId}`, category, { headers });
  // }

  updateData(optionId: number, updatedValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${optionId}`).pipe(
      switchMap(existingData => {
        const updatedData = {
          ...existingData,
          Value: updatedValue
        };
        return this.http.put(`${this.apiUrl}/${optionId}`, updatedData);
      })
    );
  }
  deleteData(optionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${optionId}`);
  }

}
