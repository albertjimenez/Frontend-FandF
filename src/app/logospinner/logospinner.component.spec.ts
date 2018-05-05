import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogospinnerComponent} from './logospinner.component';

describe('LogospinnerComponent', () => {
  let component: LogospinnerComponent;
  let fixture: ComponentFixture<LogospinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogospinnerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogospinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
