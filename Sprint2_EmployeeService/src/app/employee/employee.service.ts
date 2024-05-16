import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = "http://localhost:8080/employee";

  constructor(private httpClient:HttpClient) { }

  createEmployee(newEmployee:Employee):Observable<Employee>
  {
    return this.httpClient.post<Employee>(this.apiUrl, newEmployee);
  }


  getAllEmployee():Observable<Employee[]>
  {
    return this.httpClient.get<Employee[]>(this.apiUrl);
  }

  updateEmployee(empId:number, updatedEmployee:Employee):Observable<Employee>
  {
    return this.httpClient.put<Employee>(this.apiUrl+'/'+empId, updatedEmployee);
  }

  deleteEmployee(empId:number)
  {
      return this.httpClient.delete(this.apiUrl+'/'+empId);
  }


}
