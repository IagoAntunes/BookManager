import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAddUpdatedBook } from './c-add-updated-book';

describe('CAddUpdatedBook', () => {
  let component: CAddUpdatedBook;
  let fixture: ComponentFixture<CAddUpdatedBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CAddUpdatedBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CAddUpdatedBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
