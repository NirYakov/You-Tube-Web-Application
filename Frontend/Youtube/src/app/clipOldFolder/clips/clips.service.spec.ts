/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClipsService } from './clips.service';

describe('Service: Clips', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipsService]
    });
  });

  it('should ...', inject([ClipsService], (service: ClipsService) => {
    expect(service).toBeTruthy();
  }));
});
