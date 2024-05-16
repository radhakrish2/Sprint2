import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Placement } from './placement.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {

  private apiUrl = "http://localhost:8080/placement";

  constructor(private httpClient:HttpClient) { }

  createPlacement(newPlacement:Placement):Observable<Placement>
  {
    return this.httpClient.post<Placement>(this.apiUrl, newPlacement);
  }


  getAllPlacement():Observable<Placement[]>
  {
    return this.httpClient.get<Placement[]>(this.apiUrl);
  }

  updatePlacement(plId:number, updatedPlacement:Placement):Observable<Placement>
  {
    return this.httpClient.put<Placement>(this.apiUrl+'/'+plId, updatedPlacement);
  }

  deletePlacement(plId:number)
  {
      return this.httpClient.delete(this.apiUrl+'/'+plId);
  }


}
