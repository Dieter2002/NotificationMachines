import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionoverviewComponent } from './productionoverview.component';

describe('ProductionoverviewComponent', () => {
  let component: ProductionoverviewComponent;
  let fixture: ComponentFixture<ProductionoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionoverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
