import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8080/user";

  constructor(private httpClient:HttpClient) { }

  createUser(newUser:User):Observable<User>
  {
    return this.httpClient.post<User>(this.apiUrl, newUser);
  }


  getAllUser():Observable<User[]>
  {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  updateUser(empId:number, updatedUser:User):Observable<User>
  {
    return this.httpClient.put<User>(this.apiUrl+'/'+empId, updatedUser);
  }

  deleteUser(empId:number)
  {
      return this.httpClient.delete(this.apiUrl+'/'+empId);
  }


}
