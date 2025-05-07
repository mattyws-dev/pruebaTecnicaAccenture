Prueba Técnica Accenture

Aplicación híbrida de tareas desarrollada en **Ionic + Angular** como parte de la prueba técnica para Accenture.

Tecnologías Utilizadas
- Angular 19 (standalone)
- Ionic 7 Framework
- Firebase + Remote Config
- Cordova (compilación Android)
- Android Studio (generación de APK)

---

Funcionalidades Principales

- Lista de tareas con soporte para:
  - Añadir, eliminar y completar tareas.
  - Filtro por estado y categoría.
  - Contadores dinámicos y mensajes según estado.

- Integración con Firebase:
  - Uso de **Firebase Remote Config** para activar/desactivar funcionalidades (feature flags).
  - Ejemplo: Ocultamiento del filtro por categoría con la key `showNewFeature`.

- Optimización de rendimiento:
---

Feature Flag: Remote Config

Desde Firebase Console puedes activar o desactivar la funcionalidad del **filtro por categoría** usando la key: showNewFeature: true / false.
Esto permite ocultar dinámicamente esa parte del UI sin necesidad de actualizar la app.

---

Instrucciones de Instalación y Compilación

### Requisitos

- Node.js y npm
- Ionic CLI y Cordova CLI
- Android Studio (para compilar desde plataformas/android)
- JDK 8 o superior

### Instalación
Clonar el repositorio, inicias el proyecto en la linea de comandos e instalar dependencias
- npm install
- npm install -g cordova
- ionic integrations enable cordova
- ionic cordova platform add android
- ionic cordova platform add ios
- ionic cordova platform add android
- cordova prepare android
- cordova prepare ios

  
Abre platforms/android en Android Studio.
Ve a Build > Generate APK
Cuando compilas con Cordova o desde Android Studio, el APK generado normalmente se guarda en esta ruta:
proyecto/platforms/android/app/build/outputs/apk/debug/app-debug.apk
- Para IOS se necesita una Mac y usar Xcode


