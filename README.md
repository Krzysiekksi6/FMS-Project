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
3. Uruchom komendę `docker compose up -d` aby uruchomić instancję bazy danych w tle
4. Uruchom komendę `npm run start` lub `npm run dev`
5. Uruchom komendę `docker compose down` aby zatrzymać działanie instancji bazy danych

# Uruchomienie testów jednostkowych i integracyjnych

1. Uruchom komendę `npm run test` aby uruchomić wszystkie testy
2. Uruchom komendę `npx jest register.test.ts` aby uruchomić pojedyncze testy

# Dodatkowe informacje dla prowadzącego

1. W katalogu głównym folderze `docs/tests` znajdują się wycinki ekranu `.png` przedstawiające uruchomienie testów jednostkowcyh oraz integracyjnych. 

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

## Szczegóły użytkownika

### Adres usługi
`/users/:id/details`

### TYP: `PUT`

### Opis
Aktualizuje  szczegóły użytkownika o określonym identyfikatorze.

### Parametry ścieżki
- `id` (parametr ścieżki): Identyfikator użytkownika.

### Przyjmuje
```json
{
  "age": 25,
  "weight": 70,
  "height": 175,
  "chestCircumference": 95,
  "waistCircumference": 80,
  "hipCircumference": 90,
  "armCircumference": 30,
  "thighCircumference": 50,
  "calfCircumference": 35
}
```

### Zwraca: 200 OK || 400 Bad Request || 404 Not Found

- 200 OK: Pomyślne zaktualizowanie szczegółów użytkownika. Odpowiedź zawiera zaktualizowane szczegóły użytkownika, w tym także obliczone BMI.

- 400 Bad Request: Błąd związany z niepoprawnym formatem żądania. Odpowiedź może zawierać komunikat, np. "Invalid data".

- 404 Not Found: Brak użytkownika o podanym identyfikatorze. Odpowiedź zawiera komunikat, np. "User not found".



# Scenariusze testowe dla testera manualnego

| Test Case ID | Opis                                                  | Kroki testowe                                                                                                                      | Oczekiwany wynik                                                                            |
|--------------|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| TC_REG_001   | Poprawna rejestracja użytkownika                      | 1. Wysłanie żądania POST na /register z poprawnymi danymi użytkownika.                                                          | Odpowiedź z kodem 201 i utworzonym użytkownikiem.                                         |
| TC_REG_002   | Brak firstname w żądaniu rejestracji                  | 1. Wysłanie żądania POST na /register bez pola firstname.                                                                       | Odpowiedź z kodem 400 - Bad Request.                                                      |
| TC_REG_003   | Brak lastname w żądaniu rejestracji                   | 1. Wysłanie żądania POST na /register bez pola lastname.                                                                        | Odpowiedź z kodem 400 - Bad Request.                                                      |
| TC_REG_004   | Brak username w żądaniu rejestracji                   | 1. Wysłanie żądania POST na /register bez pola username.                                                                        | Odpowiedź z kodem 400 - Bad Request.                                                      |
| TC_REG_005   | Brak password w żądaniu rejestracji                   | 1. Wysłanie żądania POST na /register bez pola password.                                                                        | Odpowiedź z kodem 400 - Bad Request.                                                      |
| TC_AUTH_001  | Poprawne zalogowanie użytkownika                      | 1. Utwórz i zarejestruj nowego użytkownika.                                                                                      <br>2. Wykonaj żądanie logowania z prawidłowym username i hasłem.                             | Otrzymać kod odpowiedzi HTTP 200 oraz tekst zawierający "User: {username} is logged in".    |
| TC_AUTH_002  | Brak username w żądaniu autoryzacji                   | 1. Wykonaj żądanie logowania bez podania username.                                                                              | Otrzymać kod odpowiedzi HTTP 400.                                                          |
| TC_AUTH_003  | Brak password w żądaniu autoryzacji                   | 1. Wykonaj żądanie logowania bez podania hasła.                                                                                 | Otrzymać kod odpowiedzi HTTP 400.                                                          |
| TC_AUTH_004  | Brak użytkownika o podanym username                    | 1. Wykonaj żądanie logowania z nieistniejącym username.                                                                        | Otrzymać kod odpowiedzi HTTP 401.                                                          |
| TC_AUTH_005  | Niepoprawne hasło dla istniejącego użytkownika          | 1. Utwórz i zarejestruj nowego użytkownika.                                                                                      <br>2. Wykonaj żądanie logowania z prawidłowym username, ale niepoprawnym hasłem.             | Otrzymać kod odpowiedzi HTTP 401.                                                          |
| TC_UD_001    | Poprawne dodanie szczegółów użytkownika                | 1. Utwórz i zarejestruj nowego użytkownika.                                                                                      <br>2. Wykonaj żądanie POST na /user-details/{user.id} z poprawnymi danymi szczegółów użytkownika.                                   | Odpowiedź z kodem 201 i utworzonymi szczegółami użytkownika.                               |
| TC_UD_002    | Brak użytkownika o podanym ID w żądaniu                | 1. Wykonaj żądanie POST na /user-details/999 (nieistniejący ID użytkownika).                                                    | Odpowiedź z kodem 404 - Not Found.                                                         |
| TC_UD_003    | Brak age w żądaniu dodawania szczegółów użytkownika    | 1. Utwórz i zarejestruj nowego użytkownika.                                                                                      <br>2. Wykonaj żądanie POST na /user-details/{user.id} bez pola age.                                                               | Odpowiedź z kodem 400 - Bad Request.                                                      |
| TC_UD_004    | Brak weight w żądaniu dodawania szczegółów użytkownika | 1. Utwórz i zarejestruj nowego użytkownika.                                                                                      <br>2. Wykonaj żądanie POST na /user-details/{user.id} bez pola weight.                                                            | Odpowiedź z kodem 400 - Bad Request.                                                      |
| TC_UD_005    | Brak height w żądaniu dodawania szczegółów użytkownika | 1. Utwórz i zarejestruj nowego użytkownika.                                                                                      <br>2. Wykonaj żądanie POST na /user-details/{user.id} bez pola height.                                                            | Odpowiedź z kodem 400 - Bad Request.                                                      |
| TC_BMI_001   | Poprawne obliczenie BMI dla użytkownika                  | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie POST na /user-details/{user.id} z poprawnymi danymi szczegółów użytkownika, zawierającymi age, weight i height. | Odpowiedź z kodem 201 i obliczonym BMI w szczegółach użytkownika zgodnie z algorytmem kalkulatora BMI.                                                                      |
| TC_BMI_002   | Niepoprawne dane do obliczenia BMI                       | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie POST na /user-details/{user.id} z danymi szczegółów użytkownika, które nie pozwalają na poprawne obliczenie BMI (np. brak weight lub height). | Odpowiedź z kodem 400 - Bad Request.                                                                                                                                   |
| TC_BMI_003   | Poprawne obliczenie BMI dla normalnej wagi               | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie POST na /user-details/{user.id} z danymi szczegółów użytkownika, zawierającymi weight i height dla osoby o normalnej wadze.            | Odpowiedź z kodem 201 i obliczonym BMI w szczegółach użytkownika w zakresie od 18.5 do 24.9.                                                                                |
| TC_BMI_004   | Poprawne obliczenie BMI dla niedowagi                    | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie POST na /user-details/{user.id} z danymi szczegółów użytkownika, zawierającymi weight i height dla osoby z niedowagą.               | Odpowiedź z kodem 201 i obliczonym BMI w szczegółach użytkownika mniejszym niż 18.5.                                                                                      |
| TC_BMI_005   | Poprawne obliczenie BMI dla nadwagi                      | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie POST na /user-details/{user.id} z danymi szczegółów użytkownika, zawierającymi weight i height dla osoby z nadwagą.                | Odpowiedź z kodem 201 i obliczonym BMI w szczegółach użytkownika większym niż 24.9.                                                                                        |
| TC_BMI_006   | Obsługa zerowej wysokości                                | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie POST na /user-details/{user.id} z danymi szczegółów użytkownika, gdzie height wynosi 0.                        | Oczekiwane zgłoszenie błędu z komunikatem "Invalid input. Weight must be a positive number, and height must be a positive non-zero number."                               |
| TC_REG_AUTH_001   | Rejestracja i logowanie użytkownika                                | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie POST na /auth z danymi logowania (username i password).                        | Odpowiedź z kodem 200 i potwierdzeniem zalogowania użytkownika.          |
| TC_REG_AUTH_002   | Odmowa dostępu dla błędnych danych logowania                      | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie POST na /auth z błędnymi danymi logowania (niepoprawne hasło).                 | Odpowiedź z kodem 401 Unauthorized i komunikatem "Unauthorized".       |
| TC_REG_AUTH_003   | Rejestracja użytkownika i pobranie go po ID                         | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie GET na /users/{user.id}.                                              | Odpowiedź z kodem 200 i szczegółami zarejestrowanego użytkownika.       |
| TC_REG_AUTH_004   | Odmowa dostępu dla nieistniejącego ID po rejestracji                | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie GET na /users/{nonExistentUserId}.                                  | Odpowiedź z kodem 404 Not Found i komunikatem "User not found".        |
| TC_REG_USER_005   | Odmowa dostępu do nieistniejącego użytkownika po rejestracji        | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie DELETE na /users/{nonExistentUserId}.                                | Odpowiedź z kodem 404 Not Found i komunikatem "User with _id:{nonExistentUserId} not exist".                                           |
| TC_REG_USER_006   | Rejestracja 3 różnych użytkowników i pobranie listy wszystkich użytkowników | 1. Utwórz i zarejestruj trzech różnych użytkowników. <br>2. Wykonaj żądanie GET na /users.                                          | Odpowiedź z kodem 200 i listą trzech zarejestrowanych użytkowników.  |
| TC_REG_USER_007   | Odmowa rejestracji użytkowników o tym samym username                | 1. Utwórz i zarejestruj trzech użytkowników, z których dwóch ma to samo username. <br>2. Sprawdź odpowiedzi na żądania rejestracji dla każdego z użytkowników. | Odpowiedzi z kodem 409 Conflict dla dwóch użytkowników o tym samym username.                                                          |
| TC_REG_USER_008   | Rejestracja użytkownika i usunięcie go                               | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie DELETE na /users/{user.id}.                                       | Odpowiedź z kodem 200 i komunikatem "User with _id:{userId} has been removed".                                                      |
| TC_REG_USER_DETAILS_002 | Rejestracja użytkownika i dodanie szczegółów                      | 1. Utwórz i zarejestruj nowego użytkownika. <br>2. Wykonaj żądanie PUT na /users/{user.id}/details z danymi szczegółów użytkownika.         | Odpowiedź z kodem 201 i obliczonym BMI w szczegółach użytkownika.        |
| TC_REG_USER_DETAILS_003 | Odmowa dodania nieprawidłowych szczegółów użytkownika              | 1. Utwórz i zarejestruj nowego użytkownika z nieprawidłowymi danymi szczegółów. <br>2. Wykonaj żądanie PUT na /users/{user.id}/details z danymi szczegółów użytkownika. | Odpowiedź z kodem 400 i komunikatem "Invalid data".                    |

                                               
                                               





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



