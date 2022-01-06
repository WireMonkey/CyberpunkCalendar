import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isLastDayOfMonth, differenceInDays, isSameDay, compareDesc } from 'date-fns';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Events, Event } from '../interface/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events?: Events;

  constructor(private readonly httpClient: HttpClient ) { }

  getEvents(): Observable<Events> {
    if(!this.events){
      return this.httpClient.get<Events>("../assets/events.json").pipe(
        map(value => {
          value.firstDay = new Date(value.firstDay);
          value.lastDay = new Date(value.lastDay);
          value.currentDay = new Date(value.currentDay);
          if(value.events){
            value.events.forEach(e => {
              e.day = new Date(e.day);
            });
          }
          if(value.forcast){
            value.forcast.forEach(f => {
              f.day = new Date(f.day);
            })
          }
          return value;
        }),
        tap(value => this.events = value));
    } 
    
    return of(this.events);
  }

  getDayEvents(day: Date): Event[] {
    if(this.events && this.events.events) {
      let dayEvents = this.events.events.filter(e => {
       const x = isSameDay(day,e.day);
       return x;
      });

      dayEvents.sort((a: Event,b: Event) => {
        return a.isPdf && b.isPdf ? 0 : 
          a.isPdf ? -1 : 
          b.isPdf ? 1 : 0;
      });
      
      return dayEvents;
    } 
    return [];
  }

  getScreamSheetUrl(filename: string): string {
    return `../assets/screemsheets/${filename}.pdf`;
  }

  checkCurrentDay(date: Date): number {
    if(this.events){
      return compareDesc(date,this.events.currentDay);
    }
    return -1;
  }

  checkRentDue(date: Date): boolean {
    return isLastDayOfMonth(date);
  }

  getWeatherString(date: Date): string {
    if(this.events && differenceInDays(date, this.events.currentDay) < 14){
      const weather = this.events.forcast.find(f => isSameDay(date,f.day));
      return `${this.checkCurrentDay(date) >= 0 ? "Forecast is" : "Weather was"} ${weather && weather.temp ? weather.temp : "Warm"} and ${weather && weather.weather ? weather.weather : "Sunny"}.` 
    }
    return "";
  }
}
