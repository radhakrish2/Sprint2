import { TestBed } from '@angular/core/testing';

import { ShopOwnerService } from './shop_owner.service';

describe('ShopOwnerService', () => {
  let service: ShopOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
