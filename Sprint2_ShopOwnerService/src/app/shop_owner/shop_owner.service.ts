import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopOwner } from './shop_owner.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopOwnerService {

  private apiUrl = "http://localhost:8080/shopowner";

  constructor(private httpClient:HttpClient) { }

  createShopOwner(newShopOwner:ShopOwner):Observable<ShopOwner>
  {
    return this.httpClient.post<ShopOwner>(this.apiUrl, newShopOwner);
  }


  getAllShopOwner():Observable<ShopOwner[]>
  {
    return this.httpClient.get<ShopOwner[]>(this.apiUrl);
  }

  updateShopOwner(empId:number, updatedShopOwner:ShopOwner):Observable<ShopOwner>
  {
    return this.httpClient.put<ShopOwner>(this.apiUrl+'/'+empId, updatedShopOwner);
  }

  deleteShopOwner(empId:number)
  {
      return this.httpClient.delete(this.apiUrl+'/'+empId);
  }


}
