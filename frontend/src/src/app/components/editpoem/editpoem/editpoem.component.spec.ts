import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpoemComponent } from './editpoem.component';

describe('EditpoemComponent', () => {
  let component: EditpoemComponent;
  let fixture: ComponentFixture<EditpoemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpoemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditpoemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
