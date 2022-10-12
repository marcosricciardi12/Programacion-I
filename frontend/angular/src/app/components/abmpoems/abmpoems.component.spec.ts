import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmpoemsComponent } from './abmpoems.component';

describe('AbmpoemsComponent', () => {
  let component: AbmpoemsComponent;
  let fixture: ComponentFixture<AbmpoemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmpoemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmpoemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
