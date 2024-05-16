import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = "http://localhost:8080/customer";

  constructor(private httpClient:HttpClient) { }

  createCustomer(newCustomer:Customer):Observable<Customer>
  {
    return this.httpClient.post<Customer>(this.apiUrl, newCustomer);
  }


  getAllCustomer():Observable<Customer[]>
  {
    return this.httpClient.get<Customer[]>(this.apiUrl);
  }

  updateCustomer(empId:number, updatedCustomer:Customer):Observable<Customer>
  {
    return this.httpClient.put<Customer>(this.apiUrl+'/'+empId, updatedCustomer);
  }

  deleteCustomer(empId:number)
  {
      return this.httpClient.delete(this.apiUrl+'/'+empId);
  }


}
