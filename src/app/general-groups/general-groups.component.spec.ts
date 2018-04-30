import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneralGroupsComponent} from './general-groups.component';

describe('GeneralGroupsComponent', () => {
  let component: GeneralGroupsComponent;
  let fixture: ComponentFixture<GeneralGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralGroupsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
