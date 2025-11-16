# Очистка Cache

## npm

`npm cache clean --force`

## expo

`npx expo start --clean`

## gradle

1. остановить
   `./gradlew --stop`

2. удалить
   `rm -rf ~/.gradle/caches/`  
   `rm -rf ~/.gradle/caches/build-cache-*`

## android studio avd (эмулятор)

1. в андроид студио кликнуть `device manager` с правой стороны
2. выбрать эмулятор и доп. свойствах `wipe data`
