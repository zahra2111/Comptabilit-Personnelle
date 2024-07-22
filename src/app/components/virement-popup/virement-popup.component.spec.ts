import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementPopupComponent } from './virement-popup.component';

describe('VirementPopupComponent', () => {
  let component: VirementPopupComponent;
  let fixture: ComponentFixture<VirementPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirementPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
