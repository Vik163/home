# Создание хранилища ключей 👋

`keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000`

```java
// your_key_name - имя хранилища ключей
// your_key_alias - имя alias
// 10000 - количество дней
```

нужно ответить на вопросы

```
C:\android>keytool -genkey -v -keystore `test_store`.keystore -alias `test_alias` -keyalg RSA -keysize 2048 -validity 10000
Enter keystore password:
Keystore password is too short - must be at least 6 characters
Enter keystore password:
Re-enter new password:
What is your first and last name?
[Unknown]: Viktor Puz
What is the name of your organizational unit?
[Unknown]: vik163
What is the name of your organization?
[Unknown]: vik163
What is the name of your City or Locality?
[Unknown]: Samara
What is the name of your State or Province?
[Unknown]: Samara
What is the two-letter country code for this unit?
[Unknown]: ru
Is CN=Viktor Puz, OU=vik163, O=vik163, L=Samara, ST=Samara, C=ru correct?
[no]: y


Generating 2 048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10 000 days
for: CN=Viktor Puz, OU=vik163, O=vik163, L=Samara, ST=Samara, C=ru
[Storing test_store.keystore]
```

Чтобы прочитать данные из хранилища
`keytool -v -list -keystore your_key_name.keystore`
