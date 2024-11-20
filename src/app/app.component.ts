import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../environments/environment';
import { WeatherService } from './weather.service';
import { MqttService } from './mqtt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  currentDate!: string;
  currentTime!: string;
  locale: string = environment.locale;

  pseudoMaxTemperature: number = 25;
  pseudoMinTemperature: number = 18;
  pseudoSkyValue: string = 'Bewölkt'; // German: Cloudy
  pseudoSkyValueNow: string = 'sonne'; // German: Clear

  pseudoTemperatureNow: number = 22;
  pseudoRainProbability: number = 30;

  currentMessage: string = ''; // Declare currentMessage to store incoming MQTT messages

  // Inject both WeatherService and MqttService in one constructor
  constructor(private weatherService: WeatherService, private mqttService: MqttService) {}

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000); // Update time every second

    // Connect to the broker (use your broker URL here)
    this.mqttService.connect();

    // Subscribe to a topic (adjust topic name as needed)
    this.mqttService.subscribe();

    // Listen for incoming messages
    this.mqttService.message$.subscribe((message) => {
      this.currentMessage = message;
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
