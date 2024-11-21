(function (window) {
    window.env = window.env || {};
    window["env"].LOCALE = '${LOCALE}';
    window["env"].MQTT_TOPIC = '${MQTT_TOPIC}';
    window["env"].MQTT_HOST = '${MQTT_HOST}';
    window["env"].MQTT_USER = '${MQTT_USER}';
    window["env"].MQTT_PASSWORD = '${MQTT_PASSWORD}';
    window["env"].MQTT_PORT = '${MQTT_PORT}';
})(this);