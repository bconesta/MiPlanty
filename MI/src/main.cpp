#include <Arduino.h>
#define sensortemp 5
#define sensorhum 8
#define sensorluz 10

  int lecturat, lecturah, lectural = 0;
  float voltaje, grados = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {

  //temperatura
  lecturat = analogRead(sensortemp);
  voltaje = (lecturat*5)/1024;
  grados = voltaje * 100.00;

  //humedad
  //0 en el agua, 1023 en seco
  lecturah = analogRead (sensorhum);

  //luz
  lectural = analogRead (sensorluz);

  //impresiones
  Serial.print (grados);
  Serial.print (lecturah);
  Serial.print (lectural);
}
