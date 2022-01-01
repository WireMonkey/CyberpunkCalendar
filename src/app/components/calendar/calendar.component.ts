import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { endOfMonth, startOfMonth, isBefore, isEqual,addDays, startOfWeek, endOfWeek, isAfter, addMonths } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private firstDay: Date = new Date();
  private lastDay: Date = new Date();
  private month: Date = new Date();
  private currentFirstDay: Date = new Date();
  private currentLastDay: Date = new Date();

  days: Date[] = [];

  showPrevious: boolean = false;
  showNext: boolean = false;


  constructor(private readonly eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(value => {
      this.firstDay = value.firstDay;
      this.lastDay = value.lastDay;
      this.month = isBefore(value.firstDay,value.currentDay) ? startOfMonth(value.currentDay) : startOfMonth(value.currentDay);
      this.currentFirstDay = startOfWeek(this.month);
      this.currentLastDay = endOfWeek(endOfMonth(this.month));
      this.setUi();
    });
  }

  setUi(): void {
    this.getDaysArray();
    this.checkShowPrevious();
    this.checkShowNext();
    this.setScrollPosition();
  }

  getDaysArray(): void {
    this.days = [];
    let day = new Date(this.currentFirstDay);
    while(isBefore(day,this.currentLastDay) || isEqual(day,this.currentLastDay)){
      this.days.push(new Date(day));
      day = addDays(day,1);
    }
  }

  checkShowNext(): void {
    this.showNext = isAfter(this.lastDay, this.currentLastDay);
  }

  checkShowPrevious(): void {
    this.showPrevious = isBefore(this.firstDay, this.currentFirstDay);
  }

  checkDateOutsideRange(date: Date): boolean {
    return isBefore(date,this.firstDay) || isAfter(date,this.lastDay);
  }

  next(): void {
    this.month = addMonths(this.month,1);
    this.currentFirstDay = startOfWeek(this.month);
    this.currentLastDay = endOfWeek(endOfMonth(this.month));
    this.setUi();
  }

  previous(): void {
    this.month = addMonths(this.month,-1);
    this.currentFirstDay = startOfWeek(this.month);
    this.currentLastDay = endOfWeek(endOfMonth(this.month));
    this.setUi();
  }

  setScrollPosition(): void {
    if(window.scrollX || window.scrollY){
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
}
