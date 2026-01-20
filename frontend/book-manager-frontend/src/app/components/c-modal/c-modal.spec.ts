import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CModal } from './c-modal';

describe('CModal', () => {
  let component: CModal;
  let fixture: ComponentFixture<CModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
