import { Injectable } from '@angular/core';
import * as mqtt from 'mqtt';
import { environment } from '../environments/environment';  
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  private client: mqtt.MqttClient | null = null;
  private messageSubject: Subject<string> = new Subject();

  
  message$ = this.messageSubject.asObservable();

  constructor() {}

  
  connect() {
    const mqttConfig = environment.mqtt;

    const options: mqtt.IClientOptions = {
      username: mqttConfig.user,
      password: mqttConfig.password,
    };

    
    this.client = mqtt.connect(mqttConfig.host, options);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    
    this.client.on('message', (topic, message) => {
      console.log('Received message:', message.toString());
      this.messageSubject.next(message.toString()); 
    });
  }

  
  subscribe() {
    const mqttTopic = environment.mqtt.topic;
    if (this.client) {
      this.client.subscribe(mqttTopic, (err) => {
        if (err) {
          console.error('Error subscribing to topic', err);
        } else {
          console.log('Subscribed to topic:', mqttTopic);
        }
      });
    }
  }

  
  publish(topic: string, message: string) {
    if (this.client) {
      this.client.publish(topic, message);
    }
  }

  
  disconnect() {
    if (this.client) {
      this.client.end();
      console.log('Disconnected from MQTT broker');
    }
  }
}
