# Trivia Sesgos
## Requisitos

- JDK 25 (`JAVA_HOME` apuntando a esa versión — necesario para `mvnw`)
- Node.js 22+ + npm

## Configuración (`src/main/resources/application.properties`)

- `spring.datasource.url`: path de la DB SQLite (default `data/trivia.db`, se crea sola)
- `trivia.serial.port`: puerto COM del Arduino (ej. `COM4`).
- `trivia.serial.baud`: default `9600`

## Levantar

Desde la raíz del repo (`trivia-sesgos/`):
```bash
# backend (verificar JAVA_HOME antes)
./mvnw spring-boot:run     # mvnw.cmd en Windows
```
→ `http://localhost:8080`

Desde `frontend/` (backend corriendo en paralelo):
```bash
cd frontend
npm install
npm run dev
```

`npm run build` regenera `src/main/resources/static/` (lo que sirve el backend).

Sin Arduino, simular input:
```bash
curl -X POST http://localhost:8080/api/input -H "Content-Type: application/json" -d '{"type":"SELECT","value":"0"}'
```
