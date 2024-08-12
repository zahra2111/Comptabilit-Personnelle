import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebiterPopupComponent } from './debiter-popup.component';

describe('DebiterPopupComponent', () => {
  let component: DebiterPopupComponent;
  let fixture: ComponentFixture<DebiterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebiterPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebiterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
