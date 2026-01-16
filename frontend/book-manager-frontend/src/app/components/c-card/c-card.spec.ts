import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCard } from './c-card';

describe('CCard', () => {
  let component: CCard;
  let fixture: ComponentFixture<CCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
