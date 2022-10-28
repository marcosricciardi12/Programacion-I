import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpoemComponent } from './newpoem.component';

describe('NewpoemComponent', () => {
  let component: NewpoemComponent;
  let fixture: ComponentFixture<NewpoemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpoemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpoemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
