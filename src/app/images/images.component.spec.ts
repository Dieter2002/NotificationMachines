import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IimagesComponent } from './images.component';

describe('IimagesComponent', () => {
  let component: IimagesComponent;
  let fixture: ComponentFixture<IimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IimagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
