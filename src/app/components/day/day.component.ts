import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { DialogService } from 'primeng/dynamicdialog';
import { Event } from 'src/app/interface/events';
import { EventService } from 'src/app/service/event.service';
import { DayDialogComponent } from '../day-dialog/day-dialog.component';
import { ScreemsheetDialogComponent } from '../screemsheet-dialog/screemsheet-dialog.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() day!: Date;
  @Input() disable!: boolean;
  
  rentDue: boolean = false;
  isCurrentDay: number = 1;
  events: Event[] = [];
  weather: string = "";
  constructor(private readonly eventService: EventService, private readonly dialogService: DialogService) { }

  ngOnInit(): void {
    this.events = this.eventService.getDayEvents(this.day);
    this.rentDue = this.eventService.checkRentDue(this.day);
    this.isCurrentDay = this.eventService.checkCurrentDay(this.day);
    this.weather = this.eventService.getWeatherString(this.day);
  }

  openDayDialog(): void {
    if(this.events.length === 1 && this.events[0].isPdf){
      this.dialogService.open(ScreemsheetDialogComponent, {
        data: {
          fileName: this.events[0].fileName
        },
        header: "Scream Sheet",
        styleClass: "screamDialog"
      })
    } else {
      this.dialogService.open(DayDialogComponent, {
        data:{
          day: this.day,
          events: this.events,
          weather: this.weather
        },
        header: format(this.day, 'EEE LLL d yyyy')
      });
    }
  }

}
