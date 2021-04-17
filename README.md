# Brainjacked Backend

Base url: `https://brainjacked.herokuapp.com`

### Dla bazy humans

GET: `https://brainjacked.herokuapp.com/humans` - zwraca wszyskich ludzi

POST: `https://brainjacked.herokuapp.com/humans/login` - zwraca dane ludzi, wymaga podania JSONA
```
{
      "chip_code": "qwerty4444", 
      "password": "shrekislove"
}
```

POST: `https://brainjacked.herokuapp.com/humans/register` - dodaje nowych ludzi, wymaga podania JSONA

NIE UŻYWAĆ W APLIKACJI, NIE POZWALAM!


```
{
      "chip_code": "qwerty4444", 
      "password": "shrekislove"
}
```
GET: `https://brainjacked.herokuapp.com/humans/:chip_code` - zwraca czlowieka na podstawie chipu 
(nwm czy chcemy ale jak cos to jest xd)


### Dla bazy users

GET: `https://brainjacked.herokuapp.com/users` - zwraca wszyskich userów

POST: `https://brainjacked.herokuapp.com/users/login` - logowanie, wymaga podania JSONA
```
{
      "chip_code": "qwerty4444", 
      "password": "shrekislove"
}
```

POST: `https://brainjacked.herokuapp.com/users/register` - rejestracja, wymaga podania JSONA

```
{
      "first_name": "John",
      "last_name": "Shrek",
      "chip_code": "qwerty4444", 
      "password": "shrekislove",
      "dominantHalf": "Right", //// dac enum do fronta ("Right" / "Left")
      "skills":{
          "emotion":{} // defaultowo jest "None" ale moze byc 1 z 5 wartosci: Dopamina, Serotonina itd.
      }

}
```

#### users/emotion
GET: `https://brainjacked.herokuapp.com/users/emotion/:chip_code` - odczytanie doladowanej emocji

PATCH: `https://brainjacked.herokuapp.com/users/emotion/:chip_code` - dodanie nowej doladowanej emocji
```
{
      "value": "Dopamine"
}
```
PATCH: `https://brainjacked.herokuapp.com/users/emotion/reset/:chip_code` - resetowanie emocji do "None" 