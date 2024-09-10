import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeAnswerComponent } from './propose-answer.component';

describe('ProposeAnswerComponent', () => {
  let component: ProposeAnswerComponent;
  let fixture: ComponentFixture<ProposeAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposeAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposeAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
