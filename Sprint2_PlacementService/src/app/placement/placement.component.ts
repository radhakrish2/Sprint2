import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlacementService } from './placement.service';
import { Placement } from './placement.mode';

@Component({
  selector: 'app-placement',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './placement.component.html',
  styleUrl: './placement.component.css'
})
export class PlacementComponent implements OnInit {

  constructor(private placementService:PlacementService) {  }
  ngOnInit(): void {
    this.getAllPlacement();
  }

  newPlacement:Placement = {companyName:"",jobTitile:"",placementDate:new Date(),studentId:0};
  placements:Placement[] = [];
  editingPlacement:Placement|null=null;
  updatedPlacement:Placement= {companyName:"",jobTitile:"",placementDate:new Date(),studentId:0};


  createPlacement():void{
    this.placementService.createPlacement(this.newPlacement).subscribe((createdPlacement)=>{
      this.newPlacement = {companyName:"",jobTitile:"",placementDate:new Date(),studentId:0};
      this.placements.push(createdPlacement);
      this.getAllPlacement();
    });
  }

  getAllPlacement()
  {
      this.placementService.getAllPlacement().subscribe((placements)=>{
      this.placements=placements;
    });
  }

  editPlacement(placement:Placement)
  {
    this.editingPlacement = placement;
    this.updatedPlacement= {...placement} // create a copy for editing placement
  }


  updatePlacement()
  {
    if(this.editingPlacement)
    {
      this.placementService.updatePlacement(this.editingPlacement.id!,this.updatedPlacement).subscribe(result=>{
        const index=  this.placements.findIndex((clg)=>clg.id==this.editingPlacement!.id)
        
        if(index!==-1)
        {
         
          this.placements[index]=result;
          //close edit
         this.cancelEdit();
        }
    
      });
    }
  }


  cancelEdit()
  {
    this.editingPlacement=null;
    this.updatedPlacement =  {companyName:"",jobTitile:"",placementDate:new Date(),studentId:0};
  }

  deletePlacement(plId:number)
  {
      this.placementService.deletePlacement(plId).subscribe((result)=>
      {
        this.placements =   this.placements.filter((emp)=>emp.id!==plId);
      

      });
  }


}
