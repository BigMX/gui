import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebuttonsComponent } from './sidebuttons.component';

describe('SidebuttonsComponent', () => {
  let component: SidebuttonsComponent;
  let fixture: ComponentFixture<SidebuttonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebuttonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
