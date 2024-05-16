import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ShopOwnerComponent} from './shop_owner.component';

describe('ShopOwnerComponent', () => {
  let component: ShopOwnerComponent;
  let fixture: ComponentFixture<ShopOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
