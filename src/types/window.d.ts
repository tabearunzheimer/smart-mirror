interface EnvConfig {
    LOCALE: string;
    MQTT_TOPIC: string;
    MQTT_HOST: string;
    MQTT_USER: string;
    MQTT_PASSWORD: string;
    MQTT_PORT: number;
  }
  
  interface Window {
    env: EnvConfig;
  }
  
  declare var window: Window;
  