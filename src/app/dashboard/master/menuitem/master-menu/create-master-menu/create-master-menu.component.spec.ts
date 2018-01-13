import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMasterMenuComponent } from './create-master-menu.component';

describe('CreateMasterMenuComponent', () => {
  let component: CreateMasterMenuComponent;
  let fixture: ComponentFixture<CreateMasterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMasterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMasterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
