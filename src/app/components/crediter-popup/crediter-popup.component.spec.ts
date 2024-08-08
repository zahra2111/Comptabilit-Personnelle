import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrediterPopupComponent } from './crediter-popup.component';

describe('CrediterPopupComponent', () => {
  let component: CrediterPopupComponent;
  let fixture: ComponentFixture<CrediterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrediterPopupComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrediterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
