import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
    MatButtonModule
  ]
})
export class ConsultationModule { }
