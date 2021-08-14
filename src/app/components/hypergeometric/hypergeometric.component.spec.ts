import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HypergeometricComponent } from './hypergeometric.component';

describe('HypergeometricComponent', () => {
  let component: HypergeometricComponent;
  let fixture: ComponentFixture<HypergeometricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HypergeometricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HypergeometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
