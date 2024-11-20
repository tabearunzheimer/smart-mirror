export const environment = {
    production: false,
    locale: 'de-DE', 
    mqtt: {
      topic: 'home/temperature',
      host: 'ws://broker.hivemq.com:8000/mqtt', 
      user: 'yourUsername',  
      password: 'yourPassword',  
      port: 8000,  
    }
  };
  