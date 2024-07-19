import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import {
  Options,
  PermissionPayload,
  UserRole,
  Users,
} from 'src/app/interfaces/options';

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  private baseUrl = 'http://127.0.0.1:3001';
  private apiUrl = 'http://127.0.0.1:3001/options';
  private userUrl = 'http://127.0.0.1:3001/users';
  private permissionUrl = 'http://127.0.0.1:3001/rolecategorypermissions';
  private userRoleUrl = 'http://127.0.0.1:3001/userroles';

  constructor(private http: HttpClient) {}

  postRoleCategoryPermissions(permissions: PermissionPayload): Observable<any> {
    return this.http.post(this.permissionUrl, permissions);
  }
  postUserRole(data: UserRole): Observable<any> {
    return this.http.post(this.userRoleUrl, data);
  }
  getUserById(userId: number): Observable<any> {
    const url = `${this.userUrl}/users/${userId}`;
    return this.http.get<any>(url);
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.userUrl);
  }
  postData(category: Options): Observable<Options> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Options>(this.apiUrl, category, { headers });
  }
  postUser(user: Users): Observable<Users> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Users>(this.userUrl, user, { headers });
  }

  // updateCategory(optionId: number, category: string): Observable<Options> {
  //   console.log(optionId,category+"in service")
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.put<Options>(`${this.apiUrl}/${optionId}`, category, { headers });
  // }

  updateData(optionId: number, updatedValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${optionId}`).pipe(
      switchMap((existingData) => {
        const updatedData = {
          ...existingData,
          Value: updatedValue,
        };
        return this.http.put(`${this.apiUrl}/${optionId}`, updatedData);
      })
    );
  }
  updateUser(optionId: number, updatedValue: string): Observable<any> {
    return this.http.get(`${this.userUrl}/${optionId}`).pipe(
      switchMap((existingData) => {
        const updatedData = {
          ...existingData,
          Value: updatedValue,
        };
        return this.http.put(`${this.userUrl}/${optionId}`, updatedData);
      })
    );
  }
  deleteData(optionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${optionId}`);
  }
  deleteUser(optionId: number): Observable<any> {
    return this.http.delete(`${this.userUrl}/${optionId}`);
  }
  getAdditionalFields(): Observable<any[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<any[]>(url);
  }

  addAdditionalField(field: any): Observable<any> {
    const url = `${this.apiUrl}/additional-fields`;
    return this.http.post(url, field);
  }

  addCategoryAdditionalFields(fields: any[]): Observable<any> {
    const url = `${this.baseUrl}/categoryadditionalfields`;
    return this.http.post(url, fields);
  }
  editCategory(CategoryId: number): Observable<any> {
    const url = `${this.baseUrl}/categoryadditionalfeildnames/${CategoryId}`;
    return this.http.get<any[]>(url);
  }
  removeCategoryAdditionalFields(fields: any[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categoryadditionalfields/bulk`, {
      body: fields,
    });
  }
}
