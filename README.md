## Prueba de Carga - Servicio de Login

### Descripción
Script de prueba de carga para el servicio de login utilizando K6, diseñado para alcanzar 20 TPS con validaciones de rendimiento.

### Ejecutar prueba
Navegar al directorio del proyecto: cd ejercicio-k6

Ejecutar prueba: k6 run script.js

### Instalación de K6

#### Windows
choco install k6

C:\ruta\a\k6.exe run script.js

#### macOS
brew install k6

#### Linux
Ubuntu/Debian
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

### Configuración de Prueba
Objetivo: 20 TPS
Duración: 1m 20s
Umbrales:
    Tiempo respuesta p(95) < 1500ms
    Tasa de error < 3%

### Estructura

ejercicio-k6/
├── script.js # Script principal K6
├── usuarios.csv # Credenciales de prueba
├── README.md # Este archivo
└── conclusiones.txt # Resultados y hallazgos
