const int boton1 = 2;
const int boton2 = 3;
const int boton3 = 4;

void setup() {
  Serial.begin(9600);
  pinMode(boton1, INPUT);
  pinMode(boton2, INPUT);
  pinMode(boton3, INPUT);
}

void loop() {
  if (digitalRead(boton1) == HIGH) {
    Serial.println("1");
    delay(2000); 
  }
  if (digitalRead(boton2) == HIGH) {
    Serial.println("2");
    delay(2000);
  }
  if (digitalRead(boton3) == HIGH) {
    Serial.println("3");
    delay(2000);
  }
}