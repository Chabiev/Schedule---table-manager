import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleApprovalModalComponent } from './schedule-approval-modal.component';

describe('ScheduleApprovalModalComponent', () => {
  let component: ScheduleApprovalModalComponent;
  let fixture: ComponentFixture<ScheduleApprovalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleApprovalModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleApprovalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
