import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopOwnerService } from './shop_owner.service';
import { ShopOwner } from './shop_owner.mode';

@Component({
  selector: 'app-shopowner',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './shop_owner.component.html',
  styleUrl: './shop_owner.component.css'
})
export class ShopOwnerComponent implements OnInit {

  constructor(private shopOwnerService:ShopOwnerService) {  }
  ngOnInit(): void {
    this.getAllShopOwner();
  }

  newShopOwner:ShopOwner = {name:"",shopName:"",contactNumber:"",email:"" };
  shopOwners:ShopOwner[] = [];
  editingShopOwner:ShopOwner|null=null;
  updatedShopOwner:ShopOwner= {name:"",shopName:"",contactNumber:"",email:"" };


  createShopOwner():void{
    this.shopOwnerService.createShopOwner(this.newShopOwner).subscribe((createdShopOwner)=>{
      this.newShopOwner =  {name:"",shopName:"",contactNumber:"",email:"" };
      this.shopOwners.push(createdShopOwner);
      this.getAllShopOwner();
    });
  }

  getAllShopOwner()
  {
      this.shopOwnerService.getAllShopOwner().subscribe((shopOwners)=>{
      this.shopOwners=shopOwners;
    });
  }

  editShopOwner(shopOwner:ShopOwner)
  {
    this.editingShopOwner = shopOwner;
    this.updatedShopOwner= {...shopOwner} // create a copy for editing shopOwner
  }


  updateShopOwner()
  {
    if(this.editingShopOwner)
    {
      this.shopOwnerService.updateShopOwner(this.editingShopOwner.id!,this.updatedShopOwner).subscribe(result=>{
        const index=  this.shopOwners.findIndex((sw)=>sw.id==this.editingShopOwner!.id)
        
        if(index!==-1)
        {
         
          this.shopOwners[index]=result;
          //close edit
         this.cancelEdit();
        }
    
      });
    }
  }


  cancelEdit()
  {
    this.editingShopOwner=null;
    this.updatedShopOwner =  {name:"",shopName:"",contactNumber:"",email:"" };
  }

  deleteShopOwner(swId:number)
  {
      this.shopOwnerService.deleteShopOwner(swId).subscribe((result)=>
      {
        this.shopOwners =   this.shopOwners.filter((sw)=>sw.id!==swId);
      

      });
  }


}
