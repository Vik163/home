# Очистка Cache

## npm

`npm cache clear --force`

## expo

`npx expo start --clear`

## gradle

`cd android && ./gradlew cleanBuildCache` - Очищает кэш Android-сборки, что может решить проблемы, вызванные устаревшими файлами сборки или повреждением кэша при сборке Android-проекта

`./gradlew clean` - Очищает файлы сборки Gradle, удаляя все временные файлы и кэшированные данные, которые могут вызвать проблемы в процессе сборки

1. остановить
   `./gradlew --stop`

2. удалить
   `rm -rf ~/.gradle/caches/`

## android studio avd (эмулятор)

1. в андроид студио кликнуть `device manager` с правой стороны
2. выбрать эмулятор и доп. свойствах `wipe data`
