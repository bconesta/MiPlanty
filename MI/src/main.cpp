#include <Arduino.h>
#include <EEPROM.h>
#include <BluetoothSerial.h>
#include <FirebaseESP32.h>
#include <WiFi.h>

//ESTADOS{
int estado = 0;

#define UNCON 0
#define CON_FIRECON 1
#define CON_FIREUNCON 2
//ESTADOS}

//OBJETOS
BluetoothSerial SerialBT;


#define sensortemp 5
#define sensorhum 8
#define sensorluz 10

#define EEPROM_SIZE 12
String SSID = "-";
String PASS = "-";
String inst = "-";
int address = 0;
int lecturat, lecturah, lectural = 0;
float voltaje, grados = 0;
bool btEn, instChanged, SSID_select, PASS_select, SSID_changed, PASS_changed = false;

void setup() {
  Serial.begin(115200);
  EEPROM.begin(EEPROM_SIZE);

  SSID = EEPROM.readString(address);
  address += sizeof(SSID);

  if(SSID != "-"){
    PASS = EEPROM.readString(address);
    address += sizeof(PASS);
    //CONVERSIÓN DE STRING A ARRAY DE CHAR PARA USAR EN METODO begin() de WiFi
    char SSID_c[SSID.length()];
    for (int i = 0; i < sizeof(SSID); i++) {
        SSID_c[i] = SSID[i];
    }
    char PASS_c[PASS.length()];
    for (int i = 0; i < sizeof(PASS); i++) {
        PASS_c[i] = PASS[i];
    }
    //FIN DE CONVERSIÓN 
    WiFi.begin(SSID_c, PASS_c);
    long aux = millis();
    while(WiFi.status() != WL_CONNECTED){
      Serial.print(".");
      if(millis()-aux > 60000) break;
    }
    if(WiFi.status() == WL_CONNECTED) estado=CON_FIREUNCON;
    else estado=UNCON;
  }
  else estado=UNCON;

}

void loop() {
  switch(estado){
    case UNCON:
      //EN CASO DE QUE EL WIFI NO ESTE CONECTADO
      if(!btEn){SerialBT.begin("MiPlanty"); btEn=true;}
      
      if(SerialBT.available()){           //Si hay datos disponibles
        inst = SerialBT.readString();     //se leen y se almacenan en la variable "inst"
        instChanged = true;               //y se da aviso que inst fue modificada, con la variable "instChanged" (si inst fue modificada, 
      }                                   //es lo mismo que decir que se leyeron datos nuevos del puerto serie)
      
      if(inst == "SSID" && instChanged) SSID_select=true; //Si el dato recibido fue "SSID", eso indica que el siguiente dato recibido será el SSID de la red
      else if(inst == "PASS" && instChanged) PASS_select=true; //Si el dato recibido fue "PASS", eso indica que el siguiente dato recibido será la password de la red
      else if(SSID_select && instChanged){SSID = inst; SSID_select = false; SSID_changed = true;} //El dato recibido es el SSID de la red
      else if(PASS_select && instChanged){PASS = inst; PASS_select = false; PASS_changed = true;} //El dato recibido es la password de la red
      
      if(SSID_changed && PASS_changed){
        //CONVERSIÓN DE STRING A ARRAY DE CHAR PARA USAR EN METODO begin() de WiFi
        char SSID_c[SSID.length()];
        for (int i = 0; i < sizeof(SSID); i++) {
            SSID_c[i] = SSID[i];
        }
        char PASS_c[PASS.length()];
        for (int i = 0; i < sizeof(PASS); i++) {
            PASS_c[i] = PASS[i];
        }
        //FIN DE CONVERSIÓN 
        WiFi.begin(SSID_c, PASS_c);
        SerialBT.print("Intentando");
        SSID_changed = false;
        PASS_changed = false;
      }

      instChanged = false;

      //CONDICION CAMBIO DE ESTADO
      if(WiFi.status() == WL_CONNECTED){
        SerialBT.print("Conectado");
        estado=CON_FIREUNCON;
        SerialBT.end();
        btEn = false;
      }
    break;
    
    case CON_FIREUNCON:
    
    break;

    case CON_FIRECON:

    break;
  }




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
