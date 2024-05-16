import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Certificate } from './certificate.mode';
import { CertificateService } from './placement.service';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent implements OnInit {

  constructor(private certificateService:CertificateService) {  }
  ngOnInit(): void {
    this.getAllCertificate();
  }

  newCertificate:Certificate = {certificateName:"",issuingOrganization:"",issueDate:new Date(),studentId:0};
  certificates:Certificate[] = [];
  editingCertificate:Certificate|null=null;
  updatedCertificate:Certificate= {certificateName:"",issuingOrganization:"",issueDate:new Date(),studentId:0};


  createCertificate():void{
    this.certificateService.createCertificate(this.newCertificate).subscribe((createdCertificate)=>{
      this.newCertificate = {certificateName:"",issuingOrganization:"",issueDate:new Date(),studentId:0};
      this.certificates.push(createdCertificate);
      this.getAllCertificate();
    });
  }

  getAllCertificate()
  {
      this.certificateService.getAllCertificate().subscribe((certificates)=>{
      this.certificates=certificates;
    });
  }

  editCertificate(certificate:Certificate)
  {
    this.editingCertificate = certificate;
    this.updatedCertificate= {...certificate} // create a copy for editing certificate
  }


  updateCertificate()
  {
    if(this.editingCertificate)
    {
      this.certificateService.updateCertificate(this.editingCertificate.id!,this.updatedCertificate).subscribe(result=>{
        const index=  this.certificates.findIndex((clg)=>clg.id==this.editingCertificate!.id)
        
        if(index!==-1)
        {
         
          this.certificates[index]=result;
          //close edit
         this.cancelEdit();
        }
    
      });
    }
  }


  cancelEdit()
  {
    this.editingCertificate=null;
    this.updatedCertificate =  {certificateName:"",issuingOrganization:"",issueDate:new Date(),studentId:0};
  }

  deleteCertificate(cerId:number)
  {
      this.certificateService.deleteCertificate(cerId).subscribe(()=>
      {
        this.certificates =   this.certificates.filter((plId)=>plId.id!==cerId);
      

      });
  }


}
