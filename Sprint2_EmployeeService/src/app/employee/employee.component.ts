import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.mode';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService) {  }
  ngOnInit(): void {
    this.getAllEmployee();
  }

  newEmployee:Employee = {name:"rk",email:"rk@gmail.com",phoneNumber:"953623342",role:"Developer" };
  employees:Employee[] = [];
  editingEmployee:Employee|null=null;
  updatedEmployee:Employee={name:"",email:"",phoneNumber:"",role:"" };


  createEmployee():void{
    this.employeeService.createEmployee(this.newEmployee).subscribe((createdEmployee)=>{
      this.newEmployee = {name:"",email:"",phoneNumber:"",role:"" };
      this.employees.push(createdEmployee);
      this.getAllEmployee();
    });
  }

  getAllEmployee()
  {
      this.employeeService.getAllEmployee().subscribe((employees)=>{
      this.employees=employees;
    });
  }

  editEmployee(employee:Employee)
  {
    this.editingEmployee = employee;
    this.updatedEmployee= {...employee} // create a copy for editing employee
  }


  updateEmployee()
  {
    if(this.editingEmployee)
    {
      this.employeeService.updateEmployee(this.editingEmployee.id!,this.updatedEmployee).subscribe(result=>{
        const index=  this.employees.findIndex((emp)=>emp.id==this.editingEmployee!.id)
        
        if(index!==-1)
        {
         
          this.employees[index]=result;
          //close edit
         this.cancelEdit();
        }
    
      });
    }
  }


  cancelEdit()
  {
    this.editingEmployee=null;
    this.updatedEmployee = {name:"",email:"",phoneNumber:"",role:"" };
  }

  deleteEmployee(empId:number)
  {
      this.employeeService.deleteEmployee(empId).subscribe((result)=>
      {
        this.employees =   this.employees.filter((emp)=>emp.id!==empId);
      

      });
  }


}
