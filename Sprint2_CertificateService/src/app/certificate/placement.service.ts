import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Certificate } from './certificate.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private apiUrl = "http://localhost:8080/certificate";

  constructor(private httpClient:HttpClient) { }

  createCertificate(newCertificate:Certificate):Observable<Certificate>
  {
    return this.httpClient.post<Certificate>(this.apiUrl, newCertificate);
  }


  getAllCertificate():Observable<Certificate[]>
  {
    return this.httpClient.get<Certificate[]>(this.apiUrl);
  }

  updateCertificate(cerId:number, updatedCertificate:Certificate):Observable<Certificate>
  {
    return this.httpClient.put<Certificate>(this.apiUrl+'/'+cerId, updatedCertificate);
  }

  deleteCertificate(cerId:number)
  {
      return this.httpClient.delete(this.apiUrl+'/'+cerId);
  }


}
