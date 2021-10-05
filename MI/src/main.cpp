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
FirebaseData fbdo;

//Firebase
#define DB_URL "https://mi-planty-default-rtdb.firebaseio.com/"
#define DB_SECRET "JLj6uChymQPXqQJQ105kRT4rNI3HXYqxrOnIO7Mv"

#define sensortemp 5
#define sensorhum 8
#define sensorluz 10

#define EEPROM_SIZE 12
String SSID = "-";
String PASS = "-";
String ruta_fire = "-";
String inst = "-";

int address = 0;
float temp, hum, luz = 0.0;
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
    Serial.print(SSID);
    Serial.println(PASS);
    long aux = millis();
    while(WiFi.status() != WL_CONNECTED){
      Serial.print(".");
      if(millis()-aux > 60000) break;
      delay(1000);
    }
    
    if(WiFi.status() != WL_CONNECTED) estado=UNCON;
    else if(EEPROM.readString(address) == "-") estado=CON_FIREUNCON;
    else{
      estado=CON_FIRECON; 
      ruta_fire = EEPROM.readString(address);
      Firebase.begin(DB_URL, DB_SECRET);
      Firebase.reconnectWiFi(true);
    }
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
      
      if(instChanged){
        Serial.println(inst);
      }

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
        Serial.println("Intentando");
        SSID_changed = false;
        PASS_changed = false;
      }

      instChanged = false;

      //CONDICION CAMBIO DE ESTADO
      if(WiFi.status() == WL_CONNECTED){
        Serial.println("Conectando");
        address = 0;
        EEPROM.writeString(address, SSID);
        EEPROM.commit();
        address += sizeof(SSID);
        EEPROM.writeString(address, PASS);
        EEPROM.commit();
        address += sizeof(PASS);
        estado=CON_FIREUNCON;
        Serial.println("Conectado");
      }
    break;
    
    case CON_FIREUNCON:
      if(SerialBT.available()){
        ruta_fire = SerialBT.readString(); 
        EEPROM.writeString(address, ruta_fire);
        EEPROM.commit();
        estado = CON_FIRECON;
        Firebase.begin(DB_URL, DB_SECRET);
        Firebase.reconnectWiFi(true);
        SerialBT.end();
        btEn = false;
        EEPROM.end();
      }
    break;

    case CON_FIRECON:
      String ruta_temp = "/Users/" + ruta_fire + "/temp";
      String ruta_hum = "/Users/" + ruta_fire + "/hum";
      String ruta_luz = "/Users/" + ruta_fire + "/luz";

      //LECTURA TEMPERATURA
      temp = (analogRead(sensortemp)*5000/4096) * 10.00; 

      //LECTURA HUMEDAD
      hum = (analogRead(sensorhum)/4096.0) * 100.0;

      //LECTURA LUZ
      luz = (analogRead(sensorluz)/4096.0) * 100.0;

      //SUBIR DATOS A FIREBASE
      Firebase.setFloat(fbdo, ruta_temp, temp);
      Firebase.setFloat(fbdo, ruta_hum, hum);
      Firebase.setFloat(fbdo, ruta_luz, luz);
    break;
  }

}