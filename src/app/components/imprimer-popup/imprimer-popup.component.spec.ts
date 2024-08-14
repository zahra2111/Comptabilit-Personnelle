import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimerPopupComponent } from './imprimer-popup.component';

describe('ImprimerPopupComponent', () => {
  let component: ImprimerPopupComponent;
  let fixture: ComponentFixture<ImprimerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprimerPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImprimerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
