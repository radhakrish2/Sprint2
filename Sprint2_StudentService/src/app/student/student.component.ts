import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from './student.service';
import { Student } from './student.mode';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {

  constructor(private studentService:StudentService) {  }
  ngOnInit(): void {
    this.getAllStudent();
  }

  newStudent:Student = {firstName:"",lastName:"",email:"",dateOfBirth:new Date(),department:""};
  students:Student[] = [];
  editingStudent:Student|null=null;
  updatedStudent:Student={firstName:"",lastName:"",email:"",dateOfBirth:new Date(),department:""};


  createStudent():void{
    this.studentService.createStudent(this.newStudent).subscribe((createdStudent)=>{
      this.newStudent = {firstName:"",lastName:"",email:"",dateOfBirth:new Date(),department:""};
      this.students.push(createdStudent);
      this.getAllStudent();
    });
  }

  getAllStudent()
  {
      this.studentService.getAllStudent().subscribe((students)=>{
      this.students=students;
    });
  }

  editStudent(student:Student)
  {
    this.editingStudent = student;
    this.updatedStudent= {...student} // create a copy for editing student
  }


  updateStudent()
  {
    if(this.editingStudent)
    {
      this.studentService.updateStudent(this.editingStudent.id!,this.updatedStudent).subscribe(result=>{
        const index=  this.students.findIndex((clg)=>clg.id==this.editingStudent!.id)
        
        if(index!==-1)
        {
         
          this.students[index]=result;
          //close edit
         this.cancelEdit();
        }
    
      });
    }
  }


  cancelEdit()
  {
    this.editingStudent=null;
    this.updatedStudent = {firstName:"",lastName:"",email:"",dateOfBirth:new Date(),department:""};
  }

  deleteStudent(stdId:number)
  {
      this.studentService.deleteStudent(stdId).subscribe((result)=>
      {
        this.students =   this.students.filter((emp)=>emp.id!==stdId);
      

      });
  }


}
