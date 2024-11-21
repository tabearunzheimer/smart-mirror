#!/bin/bash

# Configuration
URL="https://www.wetter.com/deutschland/frankfurt-am-main/DE0002989.html"
MQTT_USER="USER"
MQTT_PASSWORD="PASSWORD"
MQTT_HOST="192.168.178.1"
MQTT_PORT="1883"
MQTT_TOPIC="weather/frankfurt"

# Fetch and parse data from the website
res=$(curl -s "$URL")
max_regex="<span class=\"\[ forecast\-navigation\-temperature\-max ]\">\K[0-9]+(?=°<\/span>)"
min_regex="<span class=\"\[ forecast\-navigation\-temperature\-min ]\">\K[0-9]+(?=°<\/span>)"
rain_prob_regex="\[ forecast\-navigation-precipitation-probability \]\">\K[0-9]+"
env_regex="alt=\"\K([A-Za-z\xc4\xe4\xf6\xd6\xdc\xfc]+)(?=\")"
now_regex="(?<=delta rtw_temp\">)\d+"
now_sky_regex="(?<=rtw_weather_txt mb--\">)[A-Za-z\xc4\xe4\xf6\xd6\xdc\xfc]+"

max=$(echo "$res" | grep -oP "$max_regex" | head -1)
min=$(echo "$res" | grep -oP "$min_regex" | head -1)
rain_prob=$(echo "$res" | grep -oP "$rain_prob_regex" | head -1)
environment=$(echo "$res" | grep -oP "$env_regex" | head -1)
now=$(echo "$res" | grep -oP "$now_regex")
now_sky=$(echo "$res" | grep -oP "$now_sky_regex")

# Debugging
#echo "Max Temperature: $max"
#echo "Min Temperature: $min"
#echo "Rain Probability: $rain_prob"
#echo "Sky Condition: $environment"
#echo "Current Temperature: $now"
#echo "Current Sky: $now_sky"

# Create JSON payload
msg="{\"max-temp\": \"$max\", \"min-temp\": \"$min\", \"rain-probability\": \"$rain_prob\", \"current-temp\": \"$now\", \"current-sky\": \"$now_sky\", \"sky\": \"$environment\"}"

# Publish JSON payload to the MQTT topic
mosquitto_pub -h "$MQTT_HOST" -p "$MQTT_PORT" -u "$MQTT_USER" -P "$MQTT_PASSWORD" -t "$MQTT_TOPIC" -m "$msg"
