import { TestBed, inject } from '@angular/core/testing';

import { RoasterService } from './roaster.service';

describe('RoasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoasterService]
    });
  });

  it('should ...', inject([RoasterService], (service: RoasterService) => {
    expect(service).toBeTruthy();
  }));
});
