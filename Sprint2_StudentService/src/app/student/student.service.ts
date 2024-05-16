import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = "http://localhost:8080/student";

  constructor(private httpClient:HttpClient) { }

  createStudent(newStudent:Student):Observable<Student>
  {
    return this.httpClient.post<Student>(this.apiUrl, newStudent);
  }


  getAllStudent():Observable<Student[]>
  {
    return this.httpClient.get<Student[]>(this.apiUrl);
  }

  updateStudent(stdId:number, updatedStudent:Student):Observable<Student>
  {
    return this.httpClient.put<Student>(this.apiUrl+'/'+stdId, updatedStudent);
  }

  deleteStudent(stdId:number)
  {
      return this.httpClient.delete(this.apiUrl+'/'+stdId);
  }


}
