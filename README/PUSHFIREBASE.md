# PUSH NOTIFICATIONS 👋

## Установка и настройка

### Устнаовка

---С expo Go не работает, только development build---  
Для этого нужно установить `npx expo install expo-dev-client`

---Работает только на устройстве (на эмуляторе и в веб не работает)---  
Добавил рабочий пример со [страницы](https://docs.expo.dev/push-notifications/push-notifications-setup/#prerequisites). Не меняя кода при верной настройке все работает только на телефоне.  
Делал строго по пунктам начиная с первого.

1. Установить пакеты.
2. Забилдить проект в [expo](https://expo.dev/accounts/vik163/projects) `eas build --platform android --profile development` (должен появиться в expo.dev)

### Добавить учётные данные Android FCM V1 (Firebase)

1. В [Firebase Console](https://console.firebase.google.com/) создать новый проект с таким же именем и (? не знаю добавлять вначале или конце настройки)(добавить в него проект андроид или айфон (имя пакета))
2. Сгенерировать приватный ключ и сохранить файл json на компьютере
3. В проекте на странице [expo](https://expo.dev/accounts/vik163/projects) выбрать вкладку `credentials` (слева внизу)
4. add Application identifier
5. Вставить projectId (после сборки в eas build находится в app.json)

   ```json

      "eas": {
        "projectId": "afb32763-a5c4-4bce-94c5-ec002372d0b2"
      }
   ```

6. Если дальше будут проблемы, то не продолжать и закрыть Application identifier и попробовать зайти в credentials снова. Должен появиться название пакета. По нему перейти.
7. add service accaunt key - загрузить файл json скачанный с firebase и сохранить.
8. На странице firebase в проекте в настройкая `general` скачать файл google-services.json
9. Поместить в корень проекта (? поместил в папку app где index.ts)
10. Прописать путь в файле app.json

```json
  "android": {
    ...
    "googleServicesFile": "./app/google-services.json"
  }
```

11. Собрать проект `eas build --platform android --profile development`

12. Если после сборки возникает ошибка firebase pushToken:

    1. Добавить файл `google-services.json` в `android/app/`
    2. В файле `android/build.gradle` добавить:

    ```java
    dependencies {
      classpath 'com.google.gms:google-services:4.4.1' // добавить (без скобок. версия может меняться. Взято после сборки eas)
      classpath('com.android.tools.build:gradle')
      classpath('com.facebook.react:react-native-gradle-plugin')
      classpath('org.jetbrains.kotlin:kotlin-gradle-plugin')
    }

    ```

    3. В файле `android/app/build.gradle` добавить в самом низу:

    ```java
    apply plugin: 'com.google.gms.google-services'

    ```

13. Настройка закончена.
14. Запустить проект на (устройстве в режиме разработчика) командой`npx expo run: android`

Рабочий пример

```javascript
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Button, Platform, Text, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    console.log("projectId:", projectId);
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      console.log("e:", e);
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function Push() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Text>Your Expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}

```
