export const environment = {
  production: false,
  locale: window.env.LOCALE, 
  mqtt: {
    topic: window.env.MQTT_TOPIC,
    host: window.env.MQTT_HOST, 
    user: window.env.MQTT_USER,  
    password: window.env.MQTT_PASSWORD,  
    port: window.env.MQTT_PORT,  
  }
};
