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

#define sensortemp 32
#define sensorhum 33
#define sensorluz 35

#define EEPROM_SIZE 512
String SSID = "-";
String PASS = "-";

String ruta_fire = "-";
String inst = "-";

int address, ad_aux = 0;
float temp, hum, luz = 0;
bool btEn, instChanged, SSID_select, PASS_select, SSID_changed, PASS_changed = false;


void setup() {
  Serial.begin(115200);
  EEPROM.begin(EEPROM_SIZE);

  SSID = EEPROM.readString(address);
  address += (SSID.length()+1);

  if(SSID != "-"){
    PASS = EEPROM.readString(address);
    address += (PASS.length()+1);
    //CONVERSIÓN DE STRING A ARRAY DE CHAR PARA USAR EN METODO begin() de WiFi
    char SSID_c[SSID.length()];
    for (int i = 0; i < SSID.length()+1; i++) {
        SSID_c[i] = SSID[i];
    }
    char PASS_c[PASS.length()];
    for (int i = 0; i < PASS.length()+1; i++) {
        PASS_c[i] = PASS[i];
    }
    //FIN DE CONVERSIÓN
    WiFi.begin(SSID_c, PASS_c);
    Serial.print(SSID);
    Serial.println(PASS);
    long aux = millis();
    while(WiFi.status() != WL_CONNECTED){
      Serial.print(".");
      if(millis()-aux > 30000) break;
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
      else if(SSID_select && instChanged){
        SSID = "";
        PASS = "";
        ruta_fire = "";
        for(int i=0; i<inst.length()+1; i++){
          if(inst[i] != '$'){
            if(SSID_select){
              SSID += " ";
            }
            else if(PASS_select){
              PASS += " ";
            }
            else{
              ruta_fire += " ";
            }
          }
          else{
            ad_aux=i+1;
            if(SSID_select){SSID_select=false; PASS_select=true;}
            else if(PASS_select){PASS_select=false;}
          }
          
        }
        SSID_select = true;
        for(int i=0; i<inst.length()+1; i++){
          if(inst[i] != '$'){
            if(SSID_select){
              SSID[i] = inst[i];
            }
            else if(PASS_select){
              PASS[i-ad_aux] = inst[i];
            }
            else{
              ruta_fire[i-ad_aux] = inst[i];
            }
          }
          else{
            ad_aux=i+1;
            if(SSID_select){SSID_select=false; SSID_changed=true; PASS_select=true;}
            else if(PASS_select){PASS_select=false; PASS_changed=true;}
          }
        }
        Serial.print("POST FOR: ");
        Serial.print(SSID + " ");
        Serial.print(PASS + " ");
        Serial.println(ruta_fire);

      }
     
      if(SSID_changed && PASS_changed){
        //CONVERSIÓN DE STRING A ARRAY DE CHAR PARA USAR EN METODO begin() de WiFi
        char SSID_c[SSID.length()];
        for (int i = 0; i < SSID.length()+1; i++) {
            SSID_c[i] = SSID[i];
        }
        char PASS_c[PASS.length()];
        for (int i = 0; i < PASS.length()+1; i++) {
            PASS_c[i] = PASS[i];
        }
        //FIN DE CONVERSIÓN
        WiFi.begin(SSID_c, PASS_c);
        Serial.println(SSID_c);
        Serial.println(PASS_c);
        Serial.println("Intentando");
        SerialBT.print("TRY$");
        long aux = millis();
        while(WiFi.status() != WL_CONNECTED){
          Serial.print(".");
          delay(500);
          if(millis()-aux > 30000){
            SerialBT.print("FAIL$");
            break;
          }
        }
        SSID_changed = false;
        PASS_changed = false;
      }

      instChanged = false;

      //CONDICION CAMBIO DE ESTADO
      if(WiFi.status() == WL_CONNECTED){
        SerialBT.print("CONNECTED$");
        Serial.println("Conectando");
        address = 0;
        EEPROM.writeString(address, SSID);
        address += (SSID.length()+1);
        EEPROM.writeString(address, PASS);
        address += (PASS.length()+1);
        EEPROM.writeString(address, ruta_fire);
        EEPROM.commit();
        EEPROM.end();
        estado=CON_FIREUNCON;
        Serial.println("Conectado");
      }
    break;
   
    case CON_FIREUNCON:
      if(true){
        //ruta_fire = SerialBT.readString();
        //EEPROM.writeString(address, ruta_fire);
        //EEPROM.commit();
        Serial.println(ruta_fire);
        estado = CON_FIRECON;
        Firebase.begin(DB_URL, DB_SECRET);
        Firebase.reconnectWiFi(true);
        SerialBT.end();
        btEn = false;
        delay(1000);
        ESP.restart();
        //EEPROM.end();
      }
    break;

    case CON_FIRECON:
      String ruta_temp = "/Users/" + ruta_fire + "/temp";
      String ruta_hum = "/Users/" + ruta_fire + "/hum";
      String ruta_luz = "/Users/" + ruta_fire + "/luz";

      //LECTURA TEMPERATURA
      temp = (analogRead(sensortemp)/4095.00)*100.00;

      //LECTURA HUMEDAD
      hum = 100-(analogRead(sensorhum)/4095.00)*100.00;

      //LECTURA LUZ
      luz = (analogRead(sensorluz)/4095.00)*100.00;

      //SUBIR DATOS A FIREBASE
      Firebase.setFloat(fbdo, ruta_temp, temp);
      Firebase.setFloat(fbdo, ruta_hum, hum);
      Firebase.setFloat(fbdo, ruta_luz, luz);
      Serial.print(temp);
      Serial.print("  ");
      Serial.print(hum);
      Serial.print("  ");
      Serial.print(luz);
      Serial.println("  ");
     
      Serial.println("Intentando subir a firebase");
    break;
  }

}
//v1.0