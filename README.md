# CockTails App

## Как собрать debug-версию приложения в Android Studio

### Предварительные требования:
1. Установленная Android Studio
    1.1 Установленный Android USB driver
    1.2 Установлена последняя версия SDK
2. Установленный JDK (Java Development Kit)
3. Настроенная переменная окружения JAVA_HOME

### Пошаговая инструкция:

1. **Подготовка проекта**
   ```bash
   npm install
   ionic build
   npx cap sync android
   ```
Если нужен только веб, то после первого пункта 

  ```
  npm run start
  ```
И перейти по http://localhost:4200/

2. **Открытие проекта в Android Studio**
   - Откройте Android Studio
   - Выберите "Open an Existing Project"
   - Найдите папку проекта и откройте директорию `/android`

3. **Сборка APK**
   - Дождитесь завершения синхронизации Gradle
   - В верхнем меню выберите `Build -> Build Bundle(s) / APK(s) -> Build APK(s)`
   - Или используйте сочетание клавиш `Ctrl + F9` для сборки проекта
   - После сборки Android Studio автоматически установит приложение на подключенное устройство

4. **Где найти собранный APK**
   - В Android Studio:
     1. Нажмите на вкладку "Build" в нижней части окна
     2. В открывшемся окне найдите раздел "Build Output"
     3. В конце логов будет указан путь к сгенерированному APK файлу
     4. Обычно путь выглядит так: `.../android/app/build/outputs/apk/debug/app-debug.apk`
   
   - Или через проводник Windows:
     1. Откройте папку проекта
     2. Перейдите в `android/app/build/outputs/apk/debug/`
     3. Если папка пуста, выполните сборку заново через Android Studio

### Альтернативный способ через командную строку:
```bash
cd android
./gradlew assembleDebug
```

### Возможные проблемы и их решение:

1. **Ошибка JAVA_HOME**
   - Убедитесь, что установлен JDK
   - Добавьте переменную окружения JAVA_HOME:
     - Откройте "Свойства системы" -> "Дополнительные параметры системы" -> "Переменные среды"
     - Добавьте новую системную переменную JAVA_HOME с путём к JDK
     - Пример: `C:\Program Files\Java\jdk-17`

2. **Ошибка SDK**
   - Откройте Android Studio
   - Перейдите в Settings -> Appearance & Behavior -> System Settings -> Android SDK
   - Установите необходимые версии SDK

3. **Ошибка Gradle**
   - Попробуйте выполнить:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleDebug
   ```

4. **APK не генерируется**
   - Убедитесь, что сборка прошла успешно (нет ошибок в логах)
   - Попробуйте выполнить сборку через Android Studio:
     1. Build -> Clean Project
     2. Build -> Rebuild Project
     3. Build -> Build Bundle(s) / APK(s) -> Build APK(s)

### Дополнительно:
- Для запуска приложения на устройстве включите "Режим разработчика" и "USB-отладку"
- Минимальная версия Android для запуска: Android 5.0 (API level 21)
- Рекомендуемая версия Android Studio: последняя стабильная версия
- После сборки APK автоматически устанавливается на подключенное устройство, но файл APK также сохраняется в указанной выше директории
