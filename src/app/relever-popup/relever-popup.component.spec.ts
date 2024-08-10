import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleverPopupComponent } from './relever-popup.component';

describe('ReleverPopupComponent', () => {
  let component: ReleverPopupComponent;
  let fixture: ComponentFixture<ReleverPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleverPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReleverPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
