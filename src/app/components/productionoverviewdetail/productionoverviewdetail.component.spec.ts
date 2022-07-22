import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionoverviewdetailComponent } from './productionoverviewdetail.component';

describe('ProductionoverviewdetailComponent', () => {
  let component: ProductionoverviewdetailComponent;
  let fixture: ComponentFixture<ProductionoverviewdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionoverviewdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionoverviewdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
