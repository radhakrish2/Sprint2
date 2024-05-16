import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = "http://localhost:8080/orders";

  constructor(private httpClient:HttpClient) { }

  createOrder(newOrder:Order):Observable<Order>
  {
    return this.httpClient.post<Order>(this.apiUrl, newOrder);
  }


  getAllOrder():Observable<Order[]>
  {
    return this.httpClient.get<Order[]>(this.apiUrl);
  }

  updateOrder(orderId:number, updatedOrder:Order):Observable<Order>
  {
    return this.httpClient.put<Order>(this.apiUrl+'/'+orderId, updatedOrder);
  }

  deleteOrder(orderId:number)
  {
      return this.httpClient.delete(this.apiUrl+'/'+orderId);
  }


}
