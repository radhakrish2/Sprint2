import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user.mode';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService) {  }
  ngOnInit(): void {
    this.getAllUser();
  }

  newUser:User = {username:"",email:"",password:"" };
  users:User[] = [];
  editingUser:User|null=null;
  updatedUser:User={username:"",email:"",password:"" };


  createUser():void{
    this.userService.createUser(this.newUser).subscribe((createdUser)=>{
      this.newUser = {username:"",email:"",password:"" };
      this.users.push(createdUser);
      this.getAllUser();
    });
  }

  getAllUser()
  {
      this.userService.getAllUser().subscribe((users)=>{
      this.users=users;
    });
  }

  editUser(user:User)
  {
    this.editingUser = user;
    this.updatedUser= {...user} // create a copy for editing user
  }


  updateUser()
  {
    if(this.editingUser)
    {
      this.userService.updateUser(this.editingUser.id!,this.updatedUser).subscribe(result=>{
        const index=  this.users.findIndex((u)=>u.id==this.editingUser!.id)
        
        if(index!==-1)
        {
         
          this.users[index]=result;
          //close edit
         this.cancelEdit();
        }
    
      });
    }
  }


  cancelEdit()
  {
    this.editingUser=null;
    this.updatedUser = {username:"",email:"",password:"" };
  }

  deleteUser(userID:number)
  {
      this.userService.deleteUser(userID).subscribe((result)=>
      {
        this.users =   this.users.filter((u)=>u.id!==userID);
      

      });
  }


}
