import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from './order.service';
import { Order } from './order.mode';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  constructor(private orderService:OrderService) {  }
  ngOnInit(): void {
    this.getAllOrder();
  }

  newOrder:Order = {orderName:"",totalPrice:0,status:"",customerId:0 };
  orders:Order[] = [];
  editingOrder:Order|null=null;
  updatedOrder:Order={orderName:"",totalPrice:0,status:"",customerId:0 };


  createOrder():void{
    this.orderService.createOrder(this.newOrder).subscribe((createdOrder)=>{
      this.newOrder = {orderName:"",totalPrice:0,status:"",customerId:0 };
      this.orders.push(createdOrder);
      this.getAllOrder();
    });
  }

  getAllOrder()
  {
      this.orderService.getAllOrder().subscribe((orders)=>{
      this.orders=orders;
    });
  }

  editOrder(order:Order)
  {
    this.editingOrder = order;
    this.updatedOrder= {...order} // create a copy for editing employee
  }


  updateOrder()
  {
    if(this.editingOrder)
    {
      this.orderService.updateOrder(this.editingOrder.id!,this.updatedOrder).subscribe(result=>{
        const index=  this.orders.findIndex((ord)=>ord.id==this.editingOrder!.id)
        
        if(index!==-1)
        {
         
          this.orders[index]=result;
          //close edit
         this.cancelEdit();
        }
    
      });
    }
  }


  cancelEdit()
  {
    this.editingOrder=null;
    this.updatedOrder = {orderName:"",totalPrice:0,status:"",customerId:0 };
  }

  deleteOrder(orderID:number)
  {
      this.orderService.deleteOrder(orderID).subscribe((result)=>
      {
        this.orders =   this.orders.filter((ord)=>ord.id!==orderID);
      

      });
  }


}
