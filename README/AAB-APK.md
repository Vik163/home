# Создать .apk из .aab

[Сайт](https://dev.to/amitkumar13/generate-and-extract-apks-from-aab-using-bundletool-2jp9)

1. Скачать последнюю версию BundleTool из [официального репозитория GitHub](https://github.com/google/bundletool/releases)
2. Скопировать файл bundletool-all-x.x.x.jar и вставить его в папку с проектом.
3. Скопировать файл your_key_name.keystore (хранилище ключей `KEYSTORE.md`) в ту же папку.
4. Скопировать файл your.aab в ту же папку.
5. Перед выполнением команды убедиться, что файлы bundletool-all-x.x.x.jar , .aab и keystore находятся в одной папке.

```java

java -jar /C:/arduino/tests/bundletool-all-1.18.2.jar build-apks \
  --bundle=/C:/arduino/tests/test.aab \
  --output=/C:/arduino/tests/test.apks \
  --mode=universal \ // будет работать на всех устройствах Android
  --ks=/C:/arduino/tests/your_key_name.keystore \
  --ks-key-alias=my-key-alias \
  --ks-pass=pass:password \
  --key-pass=pass:password
  && unzip test.apks -d test_extracted // сработает если находиться в этой папке



  // C:/arduino/tests - путь к файлам
  // your_key_name.keystore - хранилище ключей
  // my-key-alias - alias в хранилище. Имя можно узнать `KEYSTORE.md`
  // test_extracted - имя готового файла .apk
```

Автоматизация процесса

```javascript
"scripts": {
  "build-apks": "java -jar android/app/bundletool-all-1.18.2.jar build-apks \
  --bundle=android/app/test.aab \
  --output=android/app/test.apks \
  --mode=universal \
  --ks=android/app/your_key_name.keystore \
  --ks-key-alias=my-key-alias \
  --ks-pass=pass:YOUR_KEY_STORE_PASSWORD \
  --key-pass=pass:YOUR_KEY_STORE_PASSWORD
  && unzip test.apks -d test_extracted"
}
```

Примечание: используйте флаг `–overwrite`, чтобы перезаписать файл APK, если уже существует файл с таким же именем. В противном случае команда bundletool выдаст фатальную ошибку
