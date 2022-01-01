import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Event } from 'src/app/interface/events';
import { EventService } from 'src/app/service/event.service';
import { ScreemsheetDialogComponent } from '../screemsheet-dialog/screemsheet-dialog.component';

@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.css']
})
export class DayDialogComponent implements OnInit {
  day!: Date;
  events: Event[] = [];
  weather: string = "";

  constructor( private readonly dialogService: DialogService, 
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private readonly eventService: EventService) { 
    this.day = config.data.day as Date;
    this.events = config.data.events as Event[];
    this.weather = config.data.weather as string;
  }

  ngOnInit(): void {
  }

  openScreemSheetDialog(fileName?: string): void {
    if(fileName){
      this.dialogService.open(ScreemsheetDialogComponent, {
        data: {
          fileName: fileName
        },
        header: "Screem sheet",
        styleClass: "screamDialog"
      });
    } else {
      this.messageService.add({severity:'error', summary:'No File', detail:'No ScreemSheet to show.'});
    }
  }

}
