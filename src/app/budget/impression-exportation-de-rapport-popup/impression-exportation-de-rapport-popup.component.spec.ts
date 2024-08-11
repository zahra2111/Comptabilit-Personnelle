import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionExportationDeRapportPopupComponent } from './impression-exportation-de-rapport-popup.component';

describe('ImpressionExportationDeRapportPopupComponent', () => {
  let component: ImpressionExportationDeRapportPopupComponent;
  let fixture: ComponentFixture<ImpressionExportationDeRapportPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpressionExportationDeRapportPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImpressionExportationDeRapportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
