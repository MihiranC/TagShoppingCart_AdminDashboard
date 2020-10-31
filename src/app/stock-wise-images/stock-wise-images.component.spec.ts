import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockWiseImagesComponent } from './stock-wise-images.component';

describe('StockWiseImagesComponent', () => {
  let component: StockWiseImagesComponent;
  let fixture: ComponentFixture<StockWiseImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockWiseImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockWiseImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
