import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service'; // Ajustez le chemin si nécessaire

@Component({
  selector: 'app-exporter-popup',
  templateUrl: './exporter-popup.component.html',
  styleUrls: ['./exporter-popup.component.scss']
})
export class ExporterPopupComponent implements OnInit {
  exporterForm: FormGroup;
  popupId = 'exporterPopup';
  rapports: any[] = []; // Remplacez 'any' par votre type de données spécifique

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.exporterForm = this.fb.group({
      reportType: ['', Validators.required],
      startDate: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.onReportTypeChange();
  }

  onReportTypeChange(): void {
    this.exporterForm.get('reportType')?.valueChanges.subscribe(value => {
      if (value === 'custom') {
        this.exporterForm.get('startDate')?.enable();
        this.exporterForm.get('endDate')?.enable();
      } else {
        this.exporterForm.get('startDate')?.disable();
        this.exporterForm.get('endDate')?.disable();
      }
    });
  }

  onExport(): void {
    if (this.exporterForm.valid) {
      const reportData = {
        id: this.rapports.length + 1, // Générer un ID unique
        type: this.exporterForm.value.reportType,
        exportDate: new Date()
      };
      this.rapports.push(reportData);
      this.exporterForm.reset();
    }
    
  }

  printReport(): void {
    window.print(); // Imprime la page actuelle
  }
  closePopup() {
    this.popupService.closePopup(this.popupId);
  }

  
}