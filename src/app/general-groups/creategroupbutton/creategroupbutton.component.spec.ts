import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreategroupbuttonComponent} from './creategroupbutton.component';

describe('CreategroupbuttonComponent', () => {
  let component: CreategroupbuttonComponent;
  let fixture: ComponentFixture<CreategroupbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreategroupbuttonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreategroupbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
