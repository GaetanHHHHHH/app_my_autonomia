import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeActualiteComponent } from './change-actualite.component';

describe('ChangeActualiteComponent', () => {
  let component: ChangeActualiteComponent;
  let fixture: ComponentFixture<ChangeActualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeActualiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
