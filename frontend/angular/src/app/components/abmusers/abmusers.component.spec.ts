import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmusersComponent } from './abmusers.component';

describe('AbmusersComponent', () => {
  let component: AbmusersComponent;
  let fixture: ComponentFixture<AbmusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
