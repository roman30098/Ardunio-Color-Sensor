#define DATA 10
#define S0 5
#define S1 6
#define S2 7	
#define S3 8

void setup()
{
	pinMode(S0, OUTPUT);
	pinMode(S1, OUTPUT);
	pinMode(S2, OUTPUT);
	pinMode(S3, OUTPUT);
	pinMode(DATA, INPUT);

	digitalWrite(S0, HIGH);
	digitalWrite(S1, LOW);

	Serial.begin(9600);
}

void loop()
{
	int r, g, b;

	digitalWrite(S2, LOW);
	digitalWrite(S3, LOW);
	delay(30);
	r = pulseIn(DATA, LOW, 1000);

	digitalWrite(S2,HIGH);
  	digitalWrite(S3,HIGH);
  	delay(30);
	g = pulseIn(DATA, LOW, 1000);

  	digitalWrite(S2,LOW);
  	digitalWrite(S3,HIGH);
  	delay(30);
	b = pulseIn(DATA, LOW, 1000);

	Serial.print(r);
	r = map(r, 18, 140, 255, 0);
	Serial.print(">");
	Serial.print(r);
	
	Serial.print(",");
	Serial.print(g);
	g = map(g, 26, 172, 255, 0);
	Serial.print(">");
	Serial.print(g);

	Serial.print(",");
	Serial.print(b);
	b = map(b, 21, 130, 255, 0);
	Serial.print(">");
	Serial.println(b);
	delay(10);
}

