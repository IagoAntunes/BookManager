import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CButton } from './c-button';

describe('CButton', () => {
  let component: CButton;
  let fixture: ComponentFixture<CButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
