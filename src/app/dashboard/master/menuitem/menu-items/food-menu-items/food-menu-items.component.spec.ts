import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodMenuItemsComponent } from './food-menu-items.component';

describe('FoodMenuItemsComponent', () => {
  let component: FoodMenuItemsComponent;
  let fixture: ComponentFixture<FoodMenuItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodMenuItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
