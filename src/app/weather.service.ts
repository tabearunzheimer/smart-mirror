import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherIcons: { [key: string]: string } = {
    'bedeckt': 'fas fa-cloud',
    'leicht bewölkt': 'fas fa-cloud-sun',
    'sonne': 'fas fa-sun',
    'bewölkt': 'fas fa-cloud',
    'wechselhaft': 'fa fa-cloud-sun-rain',
    'leichter regen': 'fa fa-cloud-rain',
    'regen': 'fas fa-cloud-showers-heavy',
    'schnee': 'fas fa-snowflake',
    'nebel': 'fas fa-smog',
    'gewitter': 'fas fa-bolt',
  };

  constructor() {}

  getWeatherIcon(value: string): string {
    return this.weatherIcons[value.toLowerCase()] || 'fas fa-question-circle';
  }
}
