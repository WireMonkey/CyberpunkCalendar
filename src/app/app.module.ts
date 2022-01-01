import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayComponent } from './components/day/day.component';
import { ScreemsheetDialogComponent } from './components/screemsheet-dialog/screemsheet-dialog.component';
import { DayDialogComponent } from './components/day-dialog/day-dialog.component';
import { DateFnsModule } from 'ngx-date-fns';
import { CardModule } from 'primeng/card';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { SimplePdfViewerModule } from 'simple-pdf-viewer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayComponent,
    DayDialogComponent,
    ScreemsheetDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    DynamicDialogModule,
    DateFnsModule.forRoot(),
    ButtonModule,
    SimplePdfViewerModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [DialogService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
