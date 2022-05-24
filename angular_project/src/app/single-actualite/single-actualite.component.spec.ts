import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleActualiteComponent } from './single-actualite.component';

describe('SingleActualiteComponent', () => {
  let component: SingleActualiteComponent;
  let fixture: ComponentFixture<SingleActualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleActualiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
