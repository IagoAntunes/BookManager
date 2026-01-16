import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CField } from './c-field';

describe('CField', () => {
  let component: CField;
  let fixture: ComponentFixture<CField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
