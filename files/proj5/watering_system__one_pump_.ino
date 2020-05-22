/*  
   Automatic watering system with pump, timer 3231, display 1602A
   
   Tested with Arduino UNO and PRO MINI
      
                 Set time and days with the jumpers

        watering interval: days
        watering time: seconds

        J1    J2    J3                  J4    J5    J6
       D2(H) D3(M) D4(L)  seconds      D5(H) D6(M) D7(L)   days
        red orange green              yellow  blue white
         0     0     0       10          0     0     0       1
         0     0     1       20          0     0     1       2
         0     1     0       30          0     1     0       3
         0     1     1       40          0     1     1       4
         1     0     0       50          1     0     0       5
         1     0     1       60          1     0     1       6
         1     1     0       70          1     1     0       7
         1     1     1       80          1     1     1       8
      
   The timer will switch on the pump every ... days for ... seconds
   
   D11: pump command

   No allarm for low water level

   Press push-button to light display
   
*/

#include "Wire.h"
#include <LCD.h>
#include <LiquidCrystal_I2C.h>

#define I2C_ADDR    0x3F  // Define I2C Address where the PCF8574A is
#define BACKLIGHT_PIN     3
#define En_pin  2
#define Rw_pin  1
#define Rs_pin  0
#define D4_pin  4
#define D5_pin  5
#define D6_pin  6
#define D7_pin  7
LiquidCrystal_I2C  lcd(I2C_ADDR,En_pin,Rw_pin,Rs_pin,D4_pin,D5_pin,D6_pin,D7_pin);

int ore=0;
int minuti=0;
int numeroBagnature=0;
int secondi;
int giorni;

#define DS3231_I2C_ADDRESS 0x68
// Convert normal decimal numbers to binary coded decimal
byte decToBcd(byte val)
{
  return( (val/10*16) + (val%10) );
}
// Convert binary coded decimal to normal decimal numbers
byte bcdToDec(byte val)
{
  return( (val/16*10) + (val%16) );
}

void setDS3231time(byte second, byte minute, byte hour, byte dayOfWeek, byte
dayOfMonth, byte month, byte year)
{
  // sets time and date data to DS3231
  Wire.beginTransmission(DS3231_I2C_ADDRESS);
  Wire.write(0); // set next input to start at the seconds register
  Wire.write(decToBcd(second)); // set seconds
  Wire.write(decToBcd(minute)); // set minutes
  Wire.write(decToBcd(hour)); // set hours
  Wire.write(decToBcd(dayOfWeek)); // set day of week (1=Sunday, 7=Saturday)
  Wire.write(decToBcd(dayOfMonth)); // set date (1 to 31)
  Wire.write(decToBcd(month)); // set month
  Wire.write(decToBcd(year)); // set year (0 to 99)
  Wire.endTransmission();
}

void setup()
{
  Wire.begin();
  lcd.begin (16,2);
  
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  pinMode(5, INPUT);
  pinMode(6, INPUT);
  pinMode(7, INPUT);
  pinMode(8, INPUT);
  pinMode(9, INPUT);

  secondi = 10*(4*digitalRead(2) + 2*digitalRead(3) + digitalRead(4) +1);
  giorni = 4*digitalRead(5) + 2*digitalRead(6) + digitalRead(7) +1;
// Switch on the backlight
  lcd.setBacklightPin(BACKLIGHT_PIN,POSITIVE);
  lcd.setBacklight(HIGH);
  lcd.clear();
// Visualizza le impostazioni iniziali
  lcd.setCursor (0, 0 );        // go to the 1st line
  lcd.print("Waters every ");
  lcd.print(giorni);
  lcd.print("dd");
  lcd.setCursor (0, 1 );        // go to the 2nd line
  lcd.print(60*ore + minuti);
  lcd.print("'     ");
  lcd.print(" for ");
  lcd.print(secondi);
  lcd.print("''    ");
  delay(5000);
  lcd.clear();  
// Pump shut-off
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  digitalWrite(11, LOW);
  digitalWrite(12, LOW);
// set the initial time here:
// DS3231 seconds, minutes, hours, day, date, month, year
  setDS3231time(0,0,0,0,0,0,0);
}

void readDS3231time(byte *second,
byte *minute,
byte *hour,
byte *dayOfWeek,
byte *dayOfMonth,
byte *month,
byte *year)
{
  Wire.beginTransmission(DS3231_I2C_ADDRESS);
  Wire.write(0); // set DS3231 register pointer to 00h
  Wire.endTransmission();
  Wire.requestFrom(DS3231_I2C_ADDRESS, 7);
  // request seven bytes of data from DS3231 starting from register 00h
  *second = bcdToDec(Wire.read() & 0x7f);
  *minute = bcdToDec(Wire.read());
  *hour = bcdToDec(Wire.read() & 0x3f);
  *dayOfWeek = bcdToDec(Wire.read());
  *dayOfMonth = bcdToDec(Wire.read());
  *month = bcdToDec(Wire.read());
  *year = bcdToDec(Wire.read());
}

void bagna()
{
  digitalWrite(11, HIGH);
  lcd.clear();
  lcd.print("    WATERING    ");
  delay(secondi*1000);
  digitalWrite(11, LOW);
  // After watering resets timer e ristarts countdown
  setDS3231time(0,0,0,0,0,0,0);
  lcd.clear();
  // Counts the number of waterings done
  numeroBagnature= ++numeroBagnature;
}

void displayTime()
{
  int minutiMancanti;
  byte second, minute, hour, dayOfWeek, dayOfMonth, month, year;
  // retrieve data from DS3231
  readDS3231time(&second, &minute, &hour, &dayOfWeek, &dayOfMonth, &month,
  &year);
  // calculates remaining time
  minutiMancanti=giorni*24*60 + ore*60 + minuti - dayOfWeek*24*60 - 60*hour - minute;
  if (minutiMancanti > 0)
  {// send it to lcd
    lcd.setCursor (2, 0 );        // go to the 1st line
    lcd.print(dayOfWeek, DEC);
    lcd.print("gg ");
    if (hour<10) lcd.print("0");
    lcd.print(hour, DEC);
    // convert the byte variable to a decimal number when displayed
    lcd.print(":");
    if (minute<10) lcd.print("0");
    lcd.print(minute, DEC);
    lcd.print(":");
    if (second<10) lcd.print("0");
    lcd.print(second, DEC);
    lcd.setCursor (0, 1);         // go to second line
    lcd.print("Bagnato ");
    lcd.print(numeroBagnature);
    lcd.print(" volte");
  }
  else bagna();
}

void loop()
{
  displayTime();     // display the real-time clock data on the display,
  delay(500);        // every half second
  lcd.setCursor(0,1);
  lcd.print("           ");
}
