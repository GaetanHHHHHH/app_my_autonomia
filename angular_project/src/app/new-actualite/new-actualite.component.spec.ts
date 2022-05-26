import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActualiteComponent } from './new-actualite.component';

describe('NewActualiteComponent', () => {
  let component: NewActualiteComponent;
  let fixture: ComponentFixture<NewActualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewActualiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
