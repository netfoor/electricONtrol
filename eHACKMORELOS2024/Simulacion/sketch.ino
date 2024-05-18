#include <WiFi.h>
#include <HTTPClient.h>

// Reemplaza con los datos de tu red Wi-Fi
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// URL del servidor web al que se realizará la petición POST
const char* serverUrl = "https://eo6a9j887ouj1md.m.pipedream.net";

// Datos a enviar en la petición POST (formato JSON)
const char* postData = "{\"title\": \"foo\", \"body\": \"TEMPERATURA:20 C\", \"userId\": 1}";

void setup() {
  // Inicia el monitor serie a 115200 baudios
  Serial.begin(115200);
  
  // Comienza la conexión Wi-Fi
  WiFi.begin(ssid, password);

  // Espera hasta que la conexión se establezca
  Serial.print("Conectando a WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  // Una vez conectado, muestra la dirección IP
  Serial.println("");
  Serial.println("Conectado a WiFi");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());
  
  // Realiza la petición POST
  makePostRequest();
}

void loop() {
  // El loop se mantiene vacío en este ejemplo
}

void makePostRequest() {
  if (WiFi.status() == WL_CONNECTED) { // Verifica si está conectado a Wi-Fi
    HTTPClient http;  // Crea un objeto HTTPClient

    http.begin(serverUrl);  // Especifica la URL para la petición POST
    http.addHeader("Content-Type", "application/json");  // Agrega el encabezado del tipo de contenido

    int httpResponseCode = http.POST(postData);  // Realiza la petición POST y envía los datos

    if (httpResponseCode > 0) { // Comprueba si la petición fue exitosa
      String response = http.getString();  // Obtiene el contenido de la respuesta
      Serial.println("Respuesta del servidor:");
      Serial.println(response);
    } else {
      Serial.print("Error en la petición POST, código: ");
      Serial.println(httpResponseCode);
    }

    http.end();  // Finaliza la conexión
  } else {
    Serial.println("Error: No conectado a Wi-Fi");
  }
}
