import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from './admin.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = "http://localhost:8080/admin";

  constructor(private httpClient:HttpClient) { }

  createAdmin(newAdmin:Admin):Observable<Admin>
  {
    return this.httpClient.post<Admin>(this.apiUrl, newAdmin);
  }


  getAllAdmin():Observable<Admin[]>
  {
    return this.httpClient.get<Admin[]>(this.apiUrl);
  }

  updateAdmin(empId:number, updatedAdmin:Admin):Observable<Admin>
  {
    return this.httpClient.put<Admin>(this.apiUrl+'/'+empId, updatedAdmin);
  }

  deleteAdmin(empId:number)
  {
      return this.httpClient.delete(this.apiUrl+'/'+empId);
  }


}
