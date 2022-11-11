import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemsComponent } from './poems.component';

describe('PoemsComponent', () => {
  let component: PoemsComponent;
  let fixture: ComponentFixture<PoemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
