import { Injectable } from '@angular/core';
import { MqttService as NgxMqttService, IMqttMessage, IMqttServiceOptions } from 'ngx-mqtt';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  private messageSubject: Subject<string> = new Subject();
  message$ = this.messageSubject.asObservable();

  constructor(private mqttService: NgxMqttService) {}

  connect() {
    const mqttConfig = environment.mqtt;
    
    const options: IMqttServiceOptions & { username: string; password: string, clientId: string } = {
      hostname: mqttConfig.host,  
      port: mqttConfig.port,      
      protocol: 'ws',             
      username: mqttConfig.user,  
      password: mqttConfig.password,  
      clientId: 'smart-mirror',
    };
    
    this.mqttService.connect(options);

    
    this.mqttService.onConnect.subscribe(() => {
      console.info('Connected to MQTT broker');
      this.subscribeToTopic();
    });

    
    this.mqttService.observe(mqttConfig.topic).subscribe((message: IMqttMessage) => {
      console.info(`Received message: ${message.payload.toString()}`);
      this.messageSubject.next(message.payload.toString());
    });
  }

  
  private subscribeToTopic(): void {
    const mqttTopic = environment.mqtt.topic;
    this.mqttService.observe(mqttTopic).subscribe((message: IMqttMessage) => {
      console.info(`Subscribed to topic ${mqttTopic}: ${message.payload.toString()}`);
    });
  }

  
  publish(topic: string, message: string) {
    this.mqttService.unsafePublish(topic, message, { qos: 1, retain: false });
  }

  
  disconnect() {
    this.mqttService.disconnect();
    console.info('Disconnected from MQTT broker');
  }
}
