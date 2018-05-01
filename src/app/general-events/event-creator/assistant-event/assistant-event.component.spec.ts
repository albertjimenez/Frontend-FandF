import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AssistantEventComponent} from './assistant-event.component';

describe('AssistantEventComponent', () => {
  let component: AssistantEventComponent;
  let fixture: ComponentFixture<AssistantEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssistantEventComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
