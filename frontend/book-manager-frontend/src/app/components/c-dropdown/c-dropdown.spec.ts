import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDropdown } from './c-dropdown';

describe('CDropdown', () => {
  let component: CDropdown;
  let fixture: ComponentFixture<CDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
