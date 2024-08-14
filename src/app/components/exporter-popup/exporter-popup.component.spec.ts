import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporterPopupComponent } from './exporter-popup.component';

describe('ExporterPopupComponent', () => {
  let component: ExporterPopupComponent;
  let fixture: ComponentFixture<ExporterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExporterPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExporterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
