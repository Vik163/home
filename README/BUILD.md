# Создание проекта. Сборка. Создание apk

## Создание проекта

[expo](https://docs.expo.dev/workflow/overview/)

Самый простой способ создать новый проект — использовать `create-expo-app`. После создания проекта вы можете сразу запустить его в Expo Go на физическом устройстве или в эмуляторе/симуляторе, если хотите поэкспериментировать или создать быстрый прототип.

[Локальные сборки с expo-dev-client](https://docs.expo.dev/guides/local-app-development/#local-builds-with-expo-dev-client)  
В большинстве случаев вы будете создавать и использовать тестовую сборку своего проекта. Если вы установите expo-dev-client в свой проект, то отладочная сборка вашего проекта будет включать пользовательский интерфейс expo-dev-client и инструменты.

```javascript
npx expo install expo-dev-client

```

## Сборка

### Локальная

`./gradlew build` - Компилирует и собирает Android-проект с помощью Gradle, подготавливая приложение к развертыванию или тестированию.

`npx expo run:android` - создаётся папка android с проектом
`--no-build-cache` - не должен кешироваться

`cd android && ./gradlew assembleRelease` - Создает подписанный релизный APK, подходящий для отправки в Google Play Store. Этот APK оптимизирован для производительности и безопасности

### [Create a development build on EAS](https://docs.expo.dev/develop/development-builds/create-a-build/)

Добавляется проект в [expo](<(https://expo.dev/accounts/vik163/projects)>)
при сборке создать файл keystore

```javascript
eas build --platform android --profile development

```

Конфигурация сборки, может быть улучшена (устанавливает и запускает кэшированную сборку для разработки) с помощью команды:

```javascript
eas build:dev

```

[Разработка локальных приложений](https://docs.expo.dev/guides/local-app-development/#local-app-compilation)
Чтобы скомпилировать приложение локально, вам нужно установить Android Studio и Xcode на свой компьютер, а затем либо запустить сборку с помощью этих инструментов, либо использовать `npx expo run:[android|ios]`. Это наиболее удобно, когда вы хотите отладить приложение на физическом устройстве или эмуляторе/симуляторе с помощью встроенных инструментов отладки.

Если в проекте нет каталогов android и ios, EAS Build запустит предварительную сборку для создания этих каталогов перед компиляцией.
Это поведение по умолчанию для любого проекта, созданного с помощью npx create-expo-app.

## Создание apk

### Expo

`expo build:android` - Собрать приложение для производства на Android, создавая файл .apk или .aab для отправки в Google Play Store.

### Локальная сборка

`npx expo run:android --variant release`  
apk будет в `...\android\app\build\outputs\apk\release`

#### Уменьшить размер apk

В файле app/build.gradle

```java
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.

            signingConfig signingConfigs.debug
            def enableShrinkResources = findProperty('android.enableShrinkResourcesInReleaseBuilds') ?: 'false'
            // shrinkResources enableShrinkResources.toBoolean()
            // minifyEnabled enableMinifyInReleaseBuilds
            minifyEnabled true  // уменьшение размера файла
            shrinkResources true  // уменьшение размера файла (удалит все ресурсы, которые нигде не используются в проекте)
            proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro" // уменьшение размера файла
            // proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            def enablePngCrunchInRelease = findProperty('android.enablePngCrunchInReleaseBuilds') ?: 'true'
            crunchPngs enablePngCrunchInRelease.toBoolean()
        }
    }
```

[Локальная релизная сборка (также известная как производственная сборка)](https://docs.expo.dev/guides/local-app-production/)

### Сборка с помощью EAS Build

[APK-файлы для эмуляторов и устройств Android](https://docs.expo.dev/build-reference/apk/)

1. Чтобы создать .apk, измените `eas.json`, добавив одно из следующих свойств в профиль сборки:

   - `developmentClient=true` (по умолчанию)
   - distribution для internal
   - android.buildType Для apk
   - android.gradleCommand в :app:assembleRelease, :app:assembleDebug, :app:assembleDebugOptimized (доступно для SDK 54 и более поздних версий) или в любой другой команде Gradle, которая создает .apk

   ```json
   {
     "build": {
       "preview": {
         "android": {
           "buildType": "apk"
         }
       },
       "preview2": {
         "android": {
           "gradleCommand": ":app:assembleRelease"
         }
       },
       "preview4": {
         "distribution": "internal" /*with this option you'll be able to share your build URLs with anyone, and they will be able to install the builds to their devices straight from the Expo website. When using internal, make sure the build produces a .apk or ipa file. Otherwise, the shareable URL will be not work*/
       },
       "production": {}
     }
   }
   ```

2. Запустить сборку с помощью следующей команды:

   ```java
   eas build -p android --profile preview
   ```

   _Вы можете назвать профиль как угодно. Мы назвали профиль `preview`. Однако вы можете назвать его local, emulator, или как вам больше нравится_

3. Установка сборки

   После завершения сборки интерфейс командной строки предложит вам автоматически загрузить и установить приложение на эмулятор Android. При появлении запроса нажмите Y, чтобы установить приложение на эмулятор.

   Если у вас несколько сборок, вы можете в любой момент запустить команду eas build:run для загрузки конкретной сборки и её автоматической установки на эмуляторе Android:

   ```java
   eas build:run -p android
   ```

   Команда также выводит список доступных сборок вашего проекта. Из этого списка вы можете выбрать сборку для установки на эмулятор. У каждой сборки в списке есть идентификатор, время, прошедшее с момента создания сборки, номер сборки, номер версии и информация о коммите git. В списке также отображаются недействительные сборки, если они есть в проекте.

   После завершения установки сборка появится на главном экране. Если это сборка для разработки, откройте окно терминала и запустите сервер разработки, введя команду npx expo start.

4. Запуск последней сборки

   Передайте флаг `--latest` команде `eas build:run`, чтобы загрузить и установить последнюю сборку на эмуляторе Android:

   ```java
   eas build:run -p android --latest
   ```

5. Установка на физическое устройство

   - После завершения сборки скопируйте URL-адрес APK-файла со страницы сведений о сборке или по ссылке, которая появится после завершения eas build .
   - Отправьте этот URL-адрес на своё устройство. Может быть, по электронной почте? Решать вам.
   - Откройте URL-адрес на своём устройстве, установите APK-файл и запустите его.
