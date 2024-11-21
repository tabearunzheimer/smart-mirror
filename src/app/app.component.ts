import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../environments/environment';
import { WeatherService } from './weather.service';
import { MqttService } from './mqtt.service';
import { Subject } from 'rxjs';
import { MqttModule } from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MqttModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  currentDate!: string;
  currentTime!: string;
  locale: string = environment.locale;

  pseudoMaxTemperature: number = 25;
  pseudoMinTemperature: number = 18;
  pseudoSkyValue: string = 'Bewölkt';
  pseudoSkyValueNow: string = 'Sonne';

  pseudoTemperatureNow: number = 22;
  pseudoRainProbability: number = 30;

  currentMessage: string = '';

  private messageSubject: Subject<string> = new Subject();
  message$ = this.messageSubject.asObservable();

  constructor(private weatherService: WeatherService, private mqttService: MqttService) {}

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);

    this.mqttService.connect();

    // Subscribe to MQTT messages
    this.mqttService.message$.subscribe((message) => {
      try {
        const parsedMessage = JSON.parse(message);

        // Update values based on the incoming message
        this.pseudoMaxTemperature = Number(parsedMessage['max-temp']);
        this.pseudoMinTemperature = Number(parsedMessage['min-temp']);
        this.pseudoRainProbability = Number(parsedMessage['rain-probability']);
        this.pseudoTemperatureNow = Number(parsedMessage['current-temp']);
        this.pseudoSkyValueNow = parsedMessage['current-sky'] || 'Unbekannt';
        this.pseudoSkyValue = parsedMessage['sky'] || 'Unbekannt';
      } catch (error) {
        console.error('Error parsing MQTT message:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.mqttService.disconnect();
  }

  getWeatherIcon(value: string): string {
    return this.weatherService.getWeatherIcon(value);
  }

  updateDateTime(): void {
    const now = new Date();
    const options = { weekday: 'long' } as const;
    const dayName = new Intl.DateTimeFormat(this.locale, options).format(now);
    this.currentDate = `${dayName}, ${this.padZero(now.getDate())}.${this.padZero(now.getMonth() + 1)} ${now.getFullYear()}`;
    this.currentTime = `${this.padZero(now.getHours())}:${this.padZero(now.getMinutes())}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
