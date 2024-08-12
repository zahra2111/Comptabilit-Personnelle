import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteBudgeComponent } from './confirm-delete-budge.component';

describe('ConfirmDeleteBudgeComponent', () => {
  let component: ConfirmDeleteBudgeComponent;
  let fixture: ComponentFixture<ConfirmDeleteBudgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteBudgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteBudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
