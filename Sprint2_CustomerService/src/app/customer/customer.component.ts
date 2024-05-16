import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
declare var $: any;
declare function showAddMsg():any; 
declare function showEditMsg():any; 
declare function showDeleteMsg():any; 

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

 

  constructor(private customerService:CustomerService) {  }
  ngOnInit(): void {
    this.getAllCustomer();
  }

  newCustomer:Customer = {name:"",email:"",phoneNumber:"",address:"" };
  customers:Customer[] = [];
  editingCustomer:Customer|null=null;
  updatedCustomer:Customer={name:"",email:"",phoneNumber:"",address:"" };


  createCustomer():void{
    this.customerService.createCustomer(this.newCustomer).subscribe((createdCustomer)=>{
      
      
      //call js function
      showAddMsg();

      this.customers.push(createdCustomer);
    });
       
  }

  getAllCustomer()
  {
      this.customerService.getAllCustomer().subscribe((customers)=>{
      this.customers=customers;
    });
  }

  editCustomer(customer:Customer)
  {
    this.editingCustomer = customer;
    this.updatedCustomer= {...customer} // create a copy for editing customer
  }


  updateCustomer()
  {
    if(this.editingCustomer)
    {
      this.customerService.updateCustomer(this.editingCustomer.id!,this.updatedCustomer).subscribe(result=>{
        const index=  this.customers.findIndex((emp)=>emp.id==this.editingCustomer!.id)
        
        if(index!==-1)
        {
         
          this.customers[index]=result;
          //call js function
          showEditMsg();

         //close edit
         this.cancelEdit();
        }
    
      });
    }
  }


  cancelEdit()
  {
    this.editingCustomer=null;
    this.updatedCustomer = {name:"",email:"",phoneNumber:"",address:"" };
    
  }

  deleteCustomer(empId:number)
  {
      this.customerService.deleteCustomer(empId).subscribe((result)=>
      {
        this.customers =   this.customers.filter((emp)=>emp.id!==empId);
        //call js function
        showDeleteMsg();

      });
  }


}
