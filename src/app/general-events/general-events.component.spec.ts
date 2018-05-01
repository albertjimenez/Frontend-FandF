import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneralEventsComponent} from './general-events.component';

describe('GeneralEventsComponent', () => {
  let component: GeneralEventsComponent;
  let fixture: ComponentFixture<GeneralEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralEventsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
