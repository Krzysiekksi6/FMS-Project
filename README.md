# Nazwa kursu
Testowanie i jakość oprogramowania
# Autor
Krzysztof Książek
# Temat projektu

System zarządzania zasobami żywnościowymi oraz dietą

# Opis projektu

W ramach realizacji projektu zostanie zaprojektowana oraz
zaimplementowana aplikacja, która będzie miała na celu zarządzaniem
dietą użytkownika. Podstawowe funkcje systemu:
- Wprowadzenie podstawowych danych dotyczących użytkwonika np.
wzrost, waga
- Kalkulator BMI
- Generowanie listy zakupów
- Podgląd przepisów kulinarnych



# Uruchomienie projektu

1. Uruchom komendę `npm i` w terminalu 
2. Skonfiguruj bazę danych wewnątrz pliku `src/config/connectDatabase.ts`
3. Uruchom komendę `docker compose up -d`
4. Uruchom komendę `npm run start` lub `npm run dev`

# Uruchomienie testów jednostkowych i integracyjnych

1. Uruchom komendę `npm run test` aby rozpocząć testy

# Dokumentacja API


## Rejestracja użytkownika

### Adres usługi
`/register`,

### TYP: `POST`,

### Opis
Rejestracja nowego użytkownika.


### Przyjmuje
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "johndoe123",
  "password": "securepassword"
}
```
### Zwraca: `201 Created || 409 Conflict`


# Scenariusze testowe dla testera manualnego

| Test Case ID | Opis | Kroki testowe | Oczekiwany wynik |
|--------------|------|---------------|------------------|
| TC001        | Poprawna rejestracja użytkownika | 1. Wysłanie żądania POST na /register z poprawnymi danymi użytkownika.  | Odpowiedź z kodem 201 i utworzonym użytkownikiem. |
| TC002        | Brak firstname w żądaniu rejestracji | 1. Wysłanie żądania POST na /register bez pola firstname. | Odpowiedź z kodem 400 - Bad Request. |
| TC003        | Brak lastname w żądaniu rejestracji | 1. Wysłanie żądania POST na /register bez pola lastname. | Odpowiedź z kodem 400 - Bad Request. |
| TC004        | Brak username w żądaniu rejestracji | 1. Wysłanie żądania POST na /register bez pola username. | Odpowiedź z kodem 400 - Bad Request. |
| TC005        | Brak password w żądaniu rejestracji | 1. Wysłanie żądania POST na /register bez pola password. | Odpowiedź z kodem 400 - Bad Request. |


# Technologie użyte w projekcie
1. Nodejs + Express
2. PostgresSQL
3. TypeORM
4. React.js
5. Markdown
6. Docker
7. Jest
8. Supertest
9. ExpressValidator
10. Postman



