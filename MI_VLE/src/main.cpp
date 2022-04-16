#include <Arduino.h>
#include <EEPROM.h>
#include <BluetoothSerial.h>
#include <WiFi.h>
#include <FirebaseESP32.h>

#define uStoS 1000000
#define StoMin 60

void setup() {
  // put your setup code here, to run once:
}

void loop() {
  esp_sleep_enable_timer_wakeup(5000); //TIME IN uS
  esp_deep_sleep_start();
}