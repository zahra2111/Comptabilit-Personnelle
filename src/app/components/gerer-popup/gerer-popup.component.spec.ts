import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererPopupComponent } from './gerer-popup.component';

describe('GererPopupComponent', () => {
  let component: GererPopupComponent;
  let fixture: ComponentFixture<GererPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GererPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GererPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
