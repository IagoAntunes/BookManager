import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CBadge } from './c-badge';

describe('CBadge', () => {
  let component: CBadge;
  let fixture: ComponentFixture<CBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
