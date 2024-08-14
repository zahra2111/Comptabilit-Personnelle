import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPopupComponent } from './modifier-popup.component';

describe('ModifierPopupComponent', () => {
  let component: ModifierPopupComponent;
  let fixture: ComponentFixture<ModifierPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
