import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from './admin.service';
import { Admin } from './admin.mode';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  constructor(private adminService:AdminService) {  }
  ngOnInit(): void {
    this.getAllAdmin();
  }

  newAdmin:Admin = {username:"",email:"",password:"" };
  admins:Admin[] = [];
  editingAdmin:Admin|null=null;
  updatedAdmin:Admin={username:"",email:"",password:"" };


  createAdmin():void{
    this.adminService.createAdmin(this.newAdmin).subscribe((createdAdmin)=>{
      this.newAdmin = {username:"",email:"",password:"" };
      this.admins.push(createdAdmin);
      this.getAllAdmin();
    });
  }

  getAllAdmin()
  {
      this.adminService.getAllAdmin().subscribe((admins)=>{
      this.admins=admins;
    });
  }

  editAdmin(admin:Admin)
  {
    this.editingAdmin = admin;
    this.updatedAdmin= {...admin} // create a copy for editing admin
  }


  updateAdmin()
  {
    if(this.editingAdmin)
    {
      this.adminService.updateAdmin(this.editingAdmin.id!,this.updatedAdmin).subscribe(result=>{
        const index=  this.admins.findIndex((ad)=>ad.id==this.editingAdmin!.id)
        
        if(index!==-1)
        {
         
          this.admins[index]=result;
          //close edit
         this.cancelEdit();
        }
    
      });
    }
  }


  cancelEdit()
  {
    this.editingAdmin=null;
    this.updatedAdmin = {username:"",email:"",password:"" };
  }

  deleteAdmin(adminID:number)
  {
      this.adminService.deleteAdmin(adminID).subscribe((result)=>
      {
        this.admins =   this.admins.filter((ad)=>ad.id!==adminID);
      

      });
  }


}
