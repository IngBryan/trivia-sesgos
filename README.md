# Trivia Sesgos
## Requisitos

- JDK 25 (`JAVA_HOME` apuntando a esa versión — necesario para `mvnw`)
- Node.js + npm

## Configuración (`src/main/resources/application.properties`)

- `spring.datasource.url`: path de la DB SQLite (default `data/trivia.db`, se crea sola)
- `trivia.serial.port`: puerto COM del Arduino (ej. `COM4`).
- `trivia.serial.baud`: default `9600`

## Levantar

```bash
# backend (verificar JAVA_HOME antes)
./mvnw spring-boot:run     # mvnw.cmd en Windows
```
→ `http://localhost:8080`

```bash
# frontend en dev (backend corriendo en paralelo)
cd frontend
npm install
npm run dev
```

`npm run build` regenera `src/main/resources/static/` (lo que sirve el backend).

Sin Arduino, simular input:
```bash
curl -X POST http://localhost:8080/api/input -H "Content-Type: application/json" -d '{"type":"SELECT","value":"0"}'
```
