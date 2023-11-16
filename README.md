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

## Autoryzacja użytkownika

### Adres usługi
`/auth`

### TYP: `POST`

### Opis
Proces autoryzacji użytkownika.

### Przyjmuje
```json
{
  "username": "johndoe123",
  "password": "securepassword"
}
```
### Zwraca: `200 OK || 400 Bad Request || 401 Unauthorized`
- 200 OK: Pomyślne zalogowanie użytkownika. Odpowiedź zawiera komunikat potwierdzający logowanie, np. "User: johndoe123 is logged in".

- 400 Bad Request: Błąd związany z niepoprawnym formatem żądania. Odpowiedź może zawierać komunikat, np. "Username and password are required".

- 401 Unauthorized: Błąd autoryzacji. Odpowiedź zawiera komunikat o braku autoryzacji, np. "Unauthorized".


# Scenariusze testowe dla testera manualnego

| Test Case ID | Opis                                                      | Kroki testowe                                                                                                       | Oczekiwany wynik                                                                                             |
|--------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| TC_REG_001   | Poprawna rejestracja użytkownika                          | 1. Wysłanie żądania POST na /register z poprawnymi danymi użytkownika.                                             | Odpowiedź z kodem 201 i utworzonym użytkownikiem.                                                            |
| TC_REG_002   | Brak firstname w żądaniu rejestracji                      | 1. Wysłanie żądania POST na /register bez pola firstname.                                                          | Odpowiedź z kodem 400 - Bad Request.                                                                         |
| TC_REG_003   | Brak lastname w żądaniu rejestracji                       | 1. Wysłanie żądania POST na /register bez pola lastname.                                                           | Odpowiedź z kodem 400 - Bad Request.                                                                         |
| TC_REG_004   | Brak username w żądaniu rejestracji                       | 1. Wysłanie żądania POST na /register bez pola username.                                                           | Odpowiedź z kodem 400 - Bad Request.                                                                         |
| TC_REG_005   | Brak password w żądaniu rejestracji                       | 1. Wysłanie żądania POST na /register bez pola password.                                                           | Odpowiedź z kodem 400 - Bad Request.                                                                         |
| TC_AUTH_001  | Poprawne zalogowanie użytkownika                          | 1. Utwórz i zarejestruj nowego użytkownika.                                                                        <br>2. Wykonaj żądanie logowania z prawidłowym username i hasłem.                                                | Otrzymać kod odpowiedzi HTTP 200 oraz tekst zawierający "User: {username} is logged in".                     |
| TC_AUTH_002  | Brak username w żądaniu autoryzacji                       | 1. Wykonaj żądanie logowania bez podania username.                                                                 | Otrzymać kod odpowiedzi HTTP 400.                                                                             |
| TC_AUTH_003  | Brak password w żądaniu autoryzacji                       | 1. Wykonaj żądanie logowania bez podania hasła.                                                                    | Otrzymać kod odpowiedzi HTTP 400.                                                                             |
| TC_AUTH_004  | Brak użytkownika o podanym username                        | 1. Wykonaj żądanie logowania z nieistniejącym username.                                                           | Otrzymać kod odpowiedzi HTTP 401.                                                                             |
| TC_AUTH_005  | Niepoprawne hasło dla istniejącego użytkownika              | 1. Utwórz i zarejestruj nowego użytkownika.                                                                        <br>2. Wykonaj żądanie logowania z prawidłowym username, ale niepoprawnym hasłem.                              | Otrzymać kod odpowiedzi HTTP 401.                                                                             |



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



