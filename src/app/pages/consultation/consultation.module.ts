import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'; // Needed for ngModel

import { AppConsultationComponent } from './consultation.component';
import { ConsultationRoutingModule } from './consultation.routing.module';

@NgModule({
  declarations: [AppConsultationComponent],
  imports: [
    CommonModule,
    ConsultationRoutingModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule, // Include FormsModule for ngModel
  ]
})
export class ConsultationModule { }
