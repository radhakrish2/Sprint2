import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollegeService } from './college.service';
import { College } from './college.mode';

@Component({
  selector: 'app-college',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './college.component.html',
  styleUrl: './college.component.css'
})
export class CollegeComponent implements OnInit {

  constructor(private collegeService:CollegeService) {  }
  ngOnInit(): void {
    this.getAllCollege();
  }

  newCollege:College = {name:"",address:"",accreditation:"",establishedDate:new Date()};
  colleges:College[] = [];
  editingCollege:College|null=null;
  updatedCollege:College={name:"",address:"",accreditation:"",establishedDate:new Date()};


  createCollege():void{
    this.collegeService.createCollege(this.newCollege).subscribe((createdCollege)=>{
      this.newCollege = {name:"",address:"",accreditation:"",establishedDate:new Date()};
      this.colleges.push(createdCollege);
      this.getAllCollege();
    });
  }

  getAllCollege()
  {
      this.collegeService.getAllCollege().subscribe((colleges)=>{
      this.colleges=colleges;
    });
  }

  editCollege(college:College)
  {
    this.editingCollege = college;
    this.updatedCollege= {...college} // create a copy for editing college
  }


  updateCollege()
  {
    if(this.editingCollege)
    {
      this.collegeService.updateCollege(this.editingCollege.id!,this.updatedCollege).subscribe(result=>{
        const index=  this.colleges.findIndex((clg)=>clg.id==this.editingCollege!.id)
        
        if(index!==-1)
        {
         
          this.colleges[index]=result;
          //close edit
         this.cancelEdit();
        }
    
      });
    }
  }


  cancelEdit()
  {
    this.editingCollege=null;
    this.updatedCollege = {name:"",address:"",accreditation:"",establishedDate:new Date()};
  }

  deleteCollege(clgId:number)
  {
      this.collegeService.deleteCollege(clgId).subscribe((result)=>
      {
        this.colleges =   this.colleges.filter((emp)=>emp.id!==clgId);
      

      });
  }


}
