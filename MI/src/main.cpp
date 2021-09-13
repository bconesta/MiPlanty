#include <Arduino.h>
#include <EEPROM.h>
#include <BluetoothSerial.h>
BluetoothSerial SerialBT;
#define sensortemp 5
#define sensorhum 8
#define sensorluz 10
 #define EEPROM_SIZE 12
int address = 0;
  int lecturat, lecturah, lectural = 0;
  float voltaje, grados = 0;
  String planty;

void setup() {
  Serial.begin(115200);
  SerialBT.begin("ESP32prueba");
  Serial.println("sistema inicializado");

  EEPROM.begin(EEPROM_SIZE);
   
   String nombre = "planty";

   EEPROM.writeString(address, nombre);
   EEPROM.commit();
   
}

void loop() {
  String hola;
  //hola=EEPROM.readString(address);
  Serial.println(hola);
  SerialBT.write(15);
  //EEPROM.end();
  //temperatura
 /* lecturat = analogRead(sensortemp);
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
*/
}
