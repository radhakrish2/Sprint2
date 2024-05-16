import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { College } from './college.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  private apiUrl = "http://localhost:8080/college";

  constructor(private httpClient:HttpClient) { }

  createCollege(newCollege:College):Observable<College>
  {
    return this.httpClient.post<College>(this.apiUrl, newCollege);
  }


  getAllCollege():Observable<College[]>
  {
    return this.httpClient.get<College[]>(this.apiUrl);
  }

  updateCollege(clgId:number, updatedCollege:College):Observable<College>
  {
    return this.httpClient.put<College>(this.apiUrl+'/'+clgId, updatedCollege);
  }

  deleteCollege(clgId:number)
  {
      return this.httpClient.delete(this.apiUrl+'/'+clgId);
  }


}
