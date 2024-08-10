import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-relever-popup',
  standalone: true,
  imports: [],
  templateUrl: './relever-popup.component.html',
  styleUrl: './relever-popup.component.scss'
})
export class ReleverPopupComponent {
  selectedFile: File | null = null;

  @Output() fileImported = new EventEmitter<File>();
  @Output() popupClosed = new EventEmitter<void>();

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  onImport(): void {
    if (this.selectedFile) {
      this.fileImported.emit(this.selectedFile);
      this.closePopup();
    }
  }

  onCancel(): void {
    this.closePopup();
  }

  closePopup(): void {
    this.popupClosed.emit();
  }
}