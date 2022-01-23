import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { endOfMonth, startOfMonth, isBefore, isEqual,addDays, startOfWeek, endOfWeek, isAfter, addMonths, eachDayOfInterval, isWithinInterval } from 'date-fns';
import { Events } from 'src/app/interface/events';
import { interval } from 'rxjs';

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
      this.setData(value);
    });
  }

  setData(events: Events){
    this.firstDay = events.firstDay;
      this.lastDay = events.lastDay;
      this.month = isBefore(events.firstDay,events.currentDay) ? startOfMonth(events.currentDay) : startOfMonth(events.currentDay);
      this.currentFirstDay = startOfWeek(this.month);
      this.currentLastDay = endOfWeek(endOfMonth(this.month));
      this.setUi();
  }

  setUi(): void {
    this.getDaysArray();
    this.checkShowPrevious();
    this.checkShowNext();
    this.setScrollPosition();
  }

  getDaysArray(): void {
    this.days = eachDayOfInterval(
      { start: new Date(this.currentFirstDay), end: new Date(this.currentLastDay) }
    );
  }

  checkShowNext(): void {
    this.showNext = isAfter(this.lastDay, this.currentLastDay);
  }

  checkShowPrevious(): void {
    this.showPrevious = isBefore(this.firstDay, this.currentFirstDay);
  }

  checkDateOutsideRange(date: Date): boolean {
    return !isWithinInterval(date, {
      start: new Date(this.firstDay),
      end: new Date(this.lastDay)
    });
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

  refresh(): void {
    this.eventService.refresh().subscribe(value => {
      this.setData(value);
    });
  }

  setScrollPosition(): void {
    if(window.scrollX || window.scrollY){
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

}
