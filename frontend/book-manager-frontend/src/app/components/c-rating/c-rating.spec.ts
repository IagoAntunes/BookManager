import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRating } from './c-rating';

describe('CRating', () => {
  let component: CRating;
  let fixture: ComponentFixture<CRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
