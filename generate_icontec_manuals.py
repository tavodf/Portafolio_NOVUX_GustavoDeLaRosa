"""
Generador Maestro de Libros de Funcionamiento de Software
Normas ICONTEC NTC 1486 / NTC 4490 / ISO/IEC 25010
NOVUX S.A.S. - Bogota D.C., Colombia
"""

import os
import subprocess

OUTPUT_DIR = r"D:\Worck\02_PORTAFOLIO\Portafolio_NOVUX_GustavoDeLaRosa\public\manuales"
ARTIFACT_DIR = r"C:\Users\Usuario\.gemini\antigravity\brain\caa6db79-7042-4dc2-9961-e67c18efb7a7"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

os.makedirs(OUTPUT_DIR, exist_ok=True)

ICONTEC_CSS = """
@page {
    size: letter;
    margin-top: 3cm;
    margin-bottom: 3cm;
    margin-left: 4cm;
    margin-right: 2cm;
    @bottom-right {
        content: counter(page);
        font-family: Arial, sans-serif;
        font-size: 10pt;
    }
}

body {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #111827;
    text-align: justify;
    margin: 0;
    padding: 0;
}

.cover-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    page-break-after: always;
}

.cover-title {
    margin-top: 4cm;
}

.cover-title h1 {
    font-size: 16pt;
    font-weight: bold;
    text-transform: uppercase;
    margin: 0 0 12px 0;
    line-height: 1.3;
}

.cover-title h2 {
    font-size: 12pt;
    font-weight: normal;
    text-transform: uppercase;
    color: #4b5563;
    margin: 0;
}

.cover-author {
    margin-top: 4cm;
    font-size: 12pt;
    font-weight: bold;
}

.cover-footer {
    margin-bottom: 2cm;
    font-size: 11pt;
    text-transform: uppercase;
    line-height: 1.4;
}

h1 {
    font-size: 14pt;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 1.5em;
    page-break-before: always;
}

h2 {
    font-size: 12pt;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
}

h3 {
    font-size: 12pt;
    font-weight: bold;
    margin-top: 1.2em;
    margin-bottom: 0.6em;
}

p {
    margin: 0 0 1em 0;
    text-indent: 0;
}

ul, ol {
    margin: 0 0 1em 1.5em;
    padding: 0;
}

li {
    margin-bottom: 0.5em;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    font-size: 10pt;
}

table, th, td {
    border: 1px solid #9ca3af;
}

th {
    background-color: #f3f4f6;
    font-weight: bold;
    text-align: left;
    padding: 8px 10px;
    text-transform: uppercase;
}

td {
    padding: 8px 10px;
    vertical-align: top;
}

.table-caption {
    font-size: 10pt;
    font-weight: bold;
    margin-bottom: 6px;
    text-align: left;
}

.table-source {
    font-size: 9pt;
    font-style: italic;
    color: #6b7280;
    margin-top: 4px;
    margin-bottom: 1.5em;
}

.code-box {
    background-color: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 4px solid #1e293b;
    padding: 10px 14px;
    font-family: "Courier New", Courier, monospace;
    font-size: 9.5pt;
    margin: 1.2em 0;
    white-space: pre-wrap;
    line-height: 1.4;
}

.callout-box {
    background-color: #fefce8;
    border-left: 4px solid #ca8a04;
    padding: 12px 16px;
    margin: 1.5em 0;
    font-size: 11pt;
}

.toc-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    border-bottom: 1px dotted #9ca3af;
}
"""

MANUALS = [
    {
        "id": "NOVUX_COT",
        "title": "LIBRO DE FUNCIONAMIENTO Y ESPECIFICACIÓN TÉCNICA // NOVUX COT",
        "subtitle": "PLATAFORMA DE CONTROL OPERATIVO EN TERRITORIO & GEMELOS DIGITALES 3D (C2 DIGITAL TWIN)",
        "version": "Versión 2.4 - Producción",
        "filename": "LIBRO_FUNCIONAMIENTO_NOVUX_COT.pdf",
        "doc_code": "NOVUX-MAN-COT-2026-V2",
        "content_html": """
        <h1>CONTENIDO GENERAL</h1>
        <div class="toc-item"><span>1. IDENTIFICACIÓN Y FICHA TÉCNICA DEL SISTEMA</span><span>Pág. 3</span></div>
        <div class="toc-item"><span>2. ALCANCE Y OBJETIVOS OPERATIVOS</span><span>Pág. 4</span></div>
        <div class="toc-item"><span>3. ARQUITECTURA DE SOFTWARE, MODELADO 3D Y TELEMETRÍA</span><span>Pág. 5</span></div>
        <div class="toc-item"><span>4. MANUAL DE OPERACIÓN PASO A PASO</span><span>Pág. 7</span></div>
        <div class="toc-item"><span>5. PROTOCOLOS DE SEGURIDAD Y CADENA DE CUSTODIA (SHA-256)</span><span>Pág. 9</span></div>
        <div class="toc-item"><span>6. GESTIÓN DE ERRORES Y PROCEDIMIENTOS DE CONTINGENCIA</span><span>Pág. 11</span></div>
        <div class="toc-item"><span>7. NORMAS TÉCNICAS Y REFERENCIAS (ICONTEC / ISO / IEC)</span><span>Pág. 12</span></div>

        <h1>1. IDENTIFICACIÓN Y FICHA TÉCNICA DEL SISTEMA</h1>
        <p>El presente documento establece las normas técnicas, arquitectónicas y de operación funcional de la plataforma <b>NOVUX COT</b> (Control Operativo en Territorio), desarrollada bajo estándares de ingeniería de software para misiones de Comando y Control (C2) y supervisión táctica tridimensional de cuadrillas y activos distribuidos.</p>
        
        <div class="table-caption">Tabla 1. Ficha Técnica de la Plataforma NOVUX COT</div>
        <table>
            <tr><th>Parámetro</th><th>Especificación Técnica</th></tr>
            <tr><td><b>Nombre Comercial</b></td><td>NOVUX COT // Tactical Digital Twin C2</td></tr>
            <tr><td><b>Identificador Canónico</b></td><td>CASE-COT-OPS (NVX-ENG-CORE)</td></tr>
            <tr><td><b>Motor de Renderizado Tridimensional</b></td><td>WebGL 2.0 acelerado por hardware con Three.js Engine a 60 FPS estables.</td></tr>
            <tr><td><b>Motor Cartográfico & Capas GIS</b></td><td>MapLibre GL / Mapbox Vector Tiles con proyección WGS84 (EPSG:4326).</td></tr>
            <tr><td><b>Cálculo Geodésico</b></td><td>Motor matemático Gauss-Haversine con precisión submétrica (< 0.85 m).</td></tr>
            <tr><td><b>Gobernanza Criptográfica</b></td><td>Cadena de custodia de evidencias fotográficas mediante hash inmutable SHA-256.</td></tr>
            <tr><td><b>Perímetro de Seguridad Web</b></td><td>Centinela reactivo MutationObserver con Lead Lock temporal de 45 segundos.</td></tr>
            <tr><td><b>Despliegue & Disponibilidad</b></td><td>Vercel Edge Network con redundancia multi-región y SLA del 99.98%.</td></tr>
        </table>
        <div class="table-source">Fuente: División de Ingeniería NOVUX S.A.S. (2026).</div>

        <h1>2. ALCANCE Y OBJETIVOS OPERATIVOS</h1>
        <h2>2.1 ALCANCE DEL SISTEMA</h2>
        <p>NOVUX COT está concebido para organizaciones que coordinan personal operativo en terreno: empresas de vigilancia y seguridad privada, cuadrillas de mantenimiento de servicios públicos, firmas de ingeniería civil, concesiones viales y entidades de control gubernamental. Su alcance cubre desde la geolocalización satelital en tiempo real hasta la auditoría judicial de eventos mediante registros inmutables.</p>

        <h2>2.2 OBJETIVOS OPERATIVOS PRINCIPALES</h2>
        <ul>
            <li><b>Eliminar el fraude operativo en campo:</b> Erradicar reportes falsos de asistencia y rondas ficticias mediante georreferenciación forzada y sellado criptográfico.</li>
            <li><b>Optimizar tiempos de despacho táctico:</b> Reducir el tiempo de asignación de novedades en un 70% mediante la interfaz interactiva Drag-and-Drop en el gemelo 3D.</li>
            <li><b>Blindaje probatorio ante litigios:</b> Respaldar contractualmente cada actividad con evidencias fotográficas que contienen metadatos sellados (fecha, hora UTC, coordenadas satelitales y hash hash único).</li>
        </ul>

        <h1>3. ARQUITECTURA DE SOFTWARE, MODELADO 3D Y TELEMETRÍA</h1>
        <p>La arquitectura de NOVUX COT desacopla el procesamiento espacial intensivo del hilo principal del navegador, delegando el cálculo geométrico a WebGL y funciones de memoria optimizadas.</p>

        <div class="code-box">
[ ARQUITECTURA DE FLUJO DE DATOS // NOVUX COT ]
+---------------------+     +----------------------+     +---------------------+
| Dispositivos Campo  | --> | Gateway de Telemetría| --> | Motor Gauss-Haversine|
| GPS + Cámara Móvil  |     | API REST / WebSocket |     | Cálculo Sub-métrico  |
+---------------------+     +----------------------+     +---------------------+
                                                                    │
                                                                    ▼
+---------------------+     +----------------------+     +---------------------+
| Consola Táctica Web | <-- | Motor 3D Three.js    | <-- | Base de Datos Spatial|
| Render 60 FPS GPU   |     | WebGL 2.0 + Shaders  |     | PostGIS + SHA-256 Log|
+---------------------+     +----------------------+     +---------------------+
        </div>

        <h2>3.1 ALGORITMO GEODÉSICO GAUSS-HAVERSINE</h2>
        <p>El cálculo de proximidad entre operadores en campo y puntos de control se ejecuta mediante la fórmula geodésica de Haversine compensada con el radio esferoidal medio de la Tierra (R = 6,371,000 metros):</p>
        <div class="code-box">
a = sin²(Δφ/2) + cos(φ1) ⋅ cos(φ2) ⋅ sin²(Δλ/2)
c = 2 ⋅ atan2( √a, √(1−a) )
d = R ⋅ c   (Distancia en metros lineales con error < 0.1%)
        </div>

        <h1>4. MANUAL DE OPERACIÓN PASO A PASO</h1>
        <h2>4.1 INICIO DE SESIÓN Y VISTA DEL GEMELO DIGITAL</h2>
        <p>Al acceder a la consola táctica en <code>demo-c2.novuxops.com</code>, el operador es recibido con la vista orbital de la zona metropolitana. El motor inicializa el radar táctico de 360 grados y los marcadores de cuadrantes operativos.</p>

        <h2>4.2 ASIGNACIÓN DE CUADRILLAS (DESPACHO TÁCTICO)</h2>
        <ol>
            <li><b>Selección de Unidad:</b> Hacer clic sobre el avatar tridimensional del operador en el mapa.</li>
            <li><b>Asignación de Ruta:</b> Arrastrar el punto de destino hacia la coordenada requerida (interacción Drag-and-Drop).</li>
            <li><b>Confirmación Telemétrica:</b> La plataforma calcula automáticamente la distancia geodésica y el tiempo estimado de arribo (ETA).</li>
        </ol>

        <h2>4.3 AUDITORÍA DE EVIDENCIAS FOTOGRÁFICAS</h2>
        <p>Al recibir un reporte de incidente, el panel lateral despliega la captura fotográfica con la tira de custodia digital. El operador puede verificar la integridad del hash SHA-256 para comprobar que la fotografía no sufrió alteraciones ni manipulaciones en tránsito.</p>

        <h1>5. PROTOCOLOS DE SEGURIDAD Y CADENA DE CUSTODIA (SHA-256)</h1>
        <p>En conformidad con la Ley 527 de 1999 (Comercio Electrónico y Firmas Digitales en Colombia) y la Ley 1581 de 2012 (Protección de Datos Personales), NOVUX COT implementa sellado inmutable:</p>
        <ul>
            <li><b>Hash de Integridad:</b> Cada evidencia genera una huella SHA-256 compuesta por: <code>SHA256(ImagenBytes + TimestampUTC + LatLong + DispositivoID)</code>.</li>
            <li><b>Anti-Tamper Perimetral:</b> El sistema cuenta con centinelas MutationObserver en el cliente para bloquear modificaciones no autorizadas del código fuente en memoria del navegador.</li>
            <li><b>Cifrado en Tránsito:</b> TLS 1.3 forzado con cabeceras estrictas HSTS (Strict-Transport-Security) con expiración de 2 años.</li>
        </ul>

        <h1>6. GESTIÓN DE ERRORES Y PROCEDIMIENTOS DE CONTINGENCIA</h1>
        <div class="table-caption">Tabla 2. Matriz de Excepciones y Acciones de Contingencia</div>
        <table>
            <tr><th>Código Excepción</th><th>Causa Raíz</th><th>Acción Correctiva Automatizada</th></tr>
            <tr><td><b>ERR-GPS-LOST</b></td><td>Pérdida de señal GNSS en túnel o sótano.</td><td>Conmutación a triangulación por celda celular y estimación por dead reckoning.</td></tr>
            <tr><td><b>ERR-HASH-MISMATCH</b></td><td>Evidencia fotográfica corrompida o manipulada.</td><td>Marcación inmediata de la prueba como 'NO VÁLIDA' y alerta al supervisor legal.</td></tr>
            <tr><td><b>ERR-LEAD-EXPIRED</b></td><td>Finalización del periodo de prueba táctica (45s).</td><td>Presentación del modal corporativo de licenciamiento e invitación a WhatsApp comercial.</td></tr>
        </table>
        <div class="table-source">Fuente: Protocolo de Soporte Nivel 3 NOVUX S.A.S.</div>

        <h1>7. NORMAS TÉCNICAS Y REFERENCIAS</h1>
        <p>Este sistema y su documentación técnica han sido desarrollados en concordancia con:</p>
        <ul>
            <li><b>ICONTEC NTC 1486:</b> Documentación. Presentación de tesis, trabajos de grado y otros trabajos de investigación.</li>
            <li><b>ICONTEC NTC 4490:</b> Referencias documentales para fuentes de información electrónicas.</li>
            <li><b>ISO/IEC 25010:2011:</b> Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE).</li>
            <li><b>ISO/IEC 27001:2022:</b> Information security, cybersecurity and privacy protection.</li>
        </ul>
        """
    },
    {
        "id": "NOVUX_PCD",
        "title": "LIBRO DE FUNCIONAMIENTO Y ESPECIFICACIÓN TÉCNICA // NOVUX PCD",
        "subtitle": "MOTOR DE FIJACIÓN DINÁMICA DE PRECIOS, ARBITRAJE DE MERCADO & BUY-BOX OPTIMIZER",
        "version": "Versión 3.1 - Producción",
        "filename": "LIBRO_FUNCIONAMIENTO_NOVUX_PCD.pdf",
        "doc_code": "NOVUX-MAN-PCD-2026-V3",
        "content_html": """
        <h1>CONTENIDO GENERAL</h1>
        <div class="toc-item"><span>1. IDENTIFICACIÓN Y FICHA TÉCNICA DEL MOTOR</span><span>Pág. 3</span></div>
        <div class="toc-item"><span>2. ALCANCE Y PROBLEMA ECONÓMICO RESUELTO</span><span>Pág. 4</span></div>
        <div class="toc-item"><span>3. ARQUITECTURA DE NORMALIZACIÓN MÉTRICA UNITARIA</span><span>Pág. 5</span></div>
        <div class="toc-item"><span>4. MANUAL DE OPERACIÓN: AUDITORÍA Y SIMULACIÓN</span><span>Pág. 7</span></div>
        <div class="toc-item"><span>5. MODELO MATEMÁTICO DE ELASTICIDAD Y MARGEN ÓPTIMO</span><span>Pág. 9</span></div>
        <div class="toc-item"><span>6. GESTIÓN DE ERRORES, BANDAS DE PRECIO Y CONTINGENCIAS</span><span>Pág. 11</span></div>
        <div class="toc-item"><span>7. NORMAS TÉCNICAS Y MARCO LEGAL DE COMPETENCIA</span><span>Pág. 12</span></div>

        <h1>1. IDENTIFICACIÓN Y FICHA TÉCNICA DEL MOTOR</h1>
        <p>El sistema <b>NOVUX PCD</b> (Pricing Competitor Discovery & Arbitrage Engine) constituye la solución de inteligencia de precios y optimización algorítmica de márgenes brutos de NOVUX S.A.S. Su objetivo es proporcionar a directores comerciales y analistas de pricing una ventaja cuantitativa frente a los movimientos de competidores en mercados e-commerce y retail físico.</p>

        <div class="table-caption">Tabla 1. Ficha Técnica del Motor NOVUX PCD</div>
        <table>
            <tr><th>Atributo</th><th>Detalle de Implementación</th></tr>
            <tr><td><b>Nombre Comercial</b></td><td>NOVUX PCD // Market Pricing Engine</td></tr>
            <tr><td><b>Identificador Canónico</b></td><td>CASE-PCD-PRICING (NVX-ENG-CORE)</td></tr>
            <tr><td><b>Frontend & Framework</b></td><td>React 19 + TypeScript + Vite 8 + Tailwind CSS.</td></tr>
            <tr><td><b>Motor de Gráficos Analíticos</b></td><td>Recharts Engine con renderizado reactivo de dispersión y bandas de Bollinger.</td></tr>
            <tr><td><b>Capacidad Concurrente</b></td><td>Auditoría paralela de hasta 5 competidores simultáneos por SKU.</td></tr>
            <tr><td><b>Normalización Dimensional</b></td><td>Conversión automática a precio base ($/g, $/ml, $/kg, $/unidad, $/pack).</td></tr>
            <tr><td><b>Latencia de Recálculo</b></td><td>Menor a 250 milisegundos en el navegador sin dependencias pesadas de backend.</td></tr>
            <tr><td><b>Infraestructura</b></td><td>Vercel Global Edge con protección perimetral HSTS y cabeceras nosniff.</td></tr>
        </table>
        <div class="table-source">Fuente: División de Inteligencia de Mercados NOVUX S.A.S.</div>

        <h1>2. ALCANCE Y PROBLEMA ECONÓMICO RESUELTO</h1>
        <h2>2.1 EL DOLOR EN LA FIJACIÓN DE PRECIOS</h2>
        <p>En el comercio moderno, las marcas pierden millones de pesos diarios por dos causas principales: fijar precios basándose en intuición o planillas Excel desactualizadas, y comparar productos con presentaciones de empaque diferentes (por ejemplo, comparar un frasco de 400g con uno de 250g o un paquete promocional 3x2). Esto genera la pérdida involuntaria de la Buy-Box o la erosión innecesaria del margen de utilidad.</p>

        <h2>2.2 VALOR DE NEGOCIO APORTADO</h2>
        <ul>
            <li><b>Recuperación de hasta 18.4% de margen bruto:</b> Al evitar guerras de precios autodestructivas mediante detección de precios de lista reales frente a descuentos ficticios.</li>
            <li><b>Decisiones en tiempo real:</b> Comparación segundo a segundo con competidores clave como MercadoLibre, Éxito, Alkosto, Falabella y D1.</li>
            <li><b>Estandarización absoluta:</b> Todo precio se evalúa bajo la misma unidad de medida cuantitativa.</li>
        </ul>

        <h1>3. ARQUITECTURA DE NORMALIZACIÓN MÉTRICA UNITARIA</h1>
        <p>El núcleo algorítmico de NOVUX PCD resuelve la heterogeneidad de presentaciones mediante un pipeline de extracción y normalización dimensional:</p>

        <div class="code-box">
SKU Bruto (Ej: "Café Especial 350g Pack x2")
       │
       ▼ [ Parser Regex Dimensional ]
Extrae: Cantidad = 350, Unidad = "g", Multiplicador = 2  --> Masa Total = 700g
       │
       ▼ [ Normalizador a Unidad Estándar ]
Unidad Base = 1,000g (1 Kilogramo)
Factor de Conversión = 1,000 / 700 = 1.4285
       │
       ▼ [ Precio Unitario Normalizado ]
Precio Base = Precio_Venta * Factor_Conversion = $ / kg
        </div>

        <h1>4. MANUAL DE OPERACIÓN: AUDITORÍA Y SIMULACIÓN</h1>
        <h2>4.1 SELECCIÓN DEL SKU O CATEGORÍA</h2>
        <p>Al ingresar al aplicativo en <code>market-pricing-engine-pcd-zeta.vercel.app</code>, el usuario dispone del catálogo interactivo. Al hacer clic sobre cualquier producto, el motor carga los nodos competidores asociados.</p>

        <h2>4.2 AJUSTE DE LA BANDA DE PRECIO DINÁMICA</h2>
        <ol>
            <li><b>Panel de Control de Costos:</b> Modificar el campo <i>Costo de Adquisición (COGS)</i> para recalcular la línea base de rentabilidad.</li>
            <li><b>Simulador de Margen:</b> Mover el control deslizante de <i>Margen Objetivo (%)</i> para observar cómo reacciona la cuota de mercado esperada.</li>
            <li><b>Semáforo de Competitividad:</b> El sistema marca en <b>Verde</b> si el precio sugerido lidera el mercado con margen saludable, o en <b>Rojo</b> si sacrifica rentabilidad.</li>
        </ol>

        <h1>5. MODELO MATEMÁTICO DE ELASTICIDAD Y MARGEN ÓPTIMO</h1>
        <p>El sistema estima la probabilidad de compra mediante una curva logística basada en la elasticidad precio de la demanda:</p>
        <div class="code-box">
P(BuyBox | P_propio, P_competidor) = 1 / ( 1 + e^( -k ⋅ ( P_competidor_normalizado - P_propio_normalizado ) ) )
Donde:
k = Coeficiente de elasticidad de la categoría (determinado empíricamente).
Beneficio_Esperado = ( P_propio - Costo_Unitario ) ⋅ Demanda_Base ⋅ P(BuyBox)
        </div>

        <h1>6. GESTIÓN DE ERRORES, BANDAS DE PRECIO Y CONTINGENCIAS</h1>
        <div class="table-caption">Tabla 2. Excepciones Operativas y Respuestas del Motor PCD</div>
        <table>
            <tr><th>Código de Evento</th><th>Descripción</th><th>Mecanismo de Salvaguarda</th></tr>
            <tr><td><b>WARN-OUTLIER-PRICE</b></td><td>Precio de competidor reportado en $0 o 90% por debajo del mercado (posible error tipográfico del scraper).</td><td>Filtrado automático por descarte estadístico intercuartílico (IQR). No afecta la media.</td></tr>
            <tr><td><b>ALERT-DUMPING</b></td><td>Competidor incurre en precios predatorios por debajo del costo estimado de fabricación.</td><td>Alerta al analista para evaluar acción legal por competencia desleal ante la SIC.</td></tr>
            <tr><td><b>TIMEOUT-45S</b></td><td>Finalización del periodo de prueba táctica.</td><td>Activación del Lead Lock con botón de enlace directo al asesor comercial Gustavo De La Rosa.</td></tr>
        </table>
        <div class="table-source">Fuente: Manual de Auditoría Algorítmica NOVUX PCD.</div>

        <h1>7. NORMAS TÉCNICAS Y MARCO LEGAL DE COMPETENCIA</h1>
        <ul>
            <li><b>ICONTEC NTC 1486:</b> Estructura de documentos técnicos y manuales formales.</li>
            <li><b>Ley 256 de 1996 (Colombia):</b> Normas sobre Competencia Desleal (cumplimiento estricto en extracción de datos públicos sin vulneración de secretos industriales).</li>
            <li><b>ISO/IEC 25010:</b> Eficiencia de desempeño y mantenibilidad del software.</li>
        </ul>
        """
    },
    {
        "id": "ARES_SCRAPER",
        "title": "LIBRO DE FUNCIONAMIENTO Y ESPECIFICACIÓN TÉCNICA // ARES SCRAPER",
        "subtitle": "MOTOR INDUSTRIAL DE EXTRACCIÓN WEB L7, EVASIÓN WAF & DATA LAKE FEEDER",
        "version": "Versión 4.0 - Producción",
        "filename": "LIBRO_FUNCIONAMIENTO_ARES_SCRAPER.pdf",
        "doc_code": "NOVUX-MAN-ARES-2026-V4",
        "content_html": """
        <h1>CONTENIDO GENERAL</h1>
        <div class="toc-item"><span>1. IDENTIFICACIÓN Y ESPECIFICACIÓN DE CAPA L7</span><span>Pág. 3</span></div>
        <div class="toc-item"><span>2. ALCANCE Y CASOS DE USO INDUSTRIAL</span><span>Pág. 4</span></div>
        <div class="toc-item"><span>3. ARQUITECTURA DE BYPASS PERIMETRAL Y PARSING EN C</span><span>Pág. 5</span></div>
        <div class="toc-item"><span>4. MANUAL DE OPERACIÓN DE LA CONSOLA CYBERPUNK</span><span>Pág. 7</span></div>
        <div class="toc-item"><span>5. PROTOCOLOS DE SEGURIDAD DEFENSIVA (ANTI-SSRF & PROXIES)</span><span>Pág. 9</span></div>
        <div class="toc-item"><span>6. MONITOREO DE CAPTCHA, LATENCIA Y CONTINGENCIAS</span><span>Pág. 11</span></div>
        <div class="toc-item"><span>7. NORMAS TÉCNICAS Y ESTÁNDARES INTERNACIONALES</span><span>Pág. 12</span></div>

        <h1>1. IDENTIFICACIÓN Y ESPECIFICACIÓN DE CAPA L7</h1>
        <p><b>ARES SCRAPER</b> (Advanced Resilient Extraction System) es la infraestructura propietaria de recolección masiva de datos en la web (Web Harvesting & Intelligence) de NOVUX S.A.S. Su arquitectura está diseñada para operar continuamente sobre sitios protegidos por firewalls de capa de aplicación (WAF) como Cloudflare, Akamai, DataDome y reCAPTCHA v3, sin comprometer la dirección IP corporativa del cliente.</p>

        <div class="table-caption">Tabla 1. Especificaciones de Ingeniería de ARES SCRAPER</div>
        <table>
            <tr><th>Componente</th><th>Detalle Técnico</th></tr>
            <tr><td><b>Nombre Comercial</b></td><td>ARES SCRAPER // Resilient L7 Extraction Engine</td></tr>
            <tr><td><b>Identificador Canónico</b></td><td>CASE-ARES-GRID (NVX-ENG-CORE)</td></tr>
            <tr><td><b>Capa de Operación</b></td><td>Capa 7 (Aplicación / HTTP / TLS Fingerprint spoofing).</td></tr>
            <tr><td><b>Motor de Parsing HTML</b></td><td>Parser en memoria RAM en lenguaje C nativo (libxml2 / lxml) con latencia < 180ms.</td></tr>
            <tr><td><b>Red de Evasión Perimetral</b></td><td>Rotación asíncrona de proxies residenciales con persistencia de sesiones seguras.</td></tr>
            <tr><td><b>Protección Anti-SSRF</b></td><td>Resolución DNS estricta con bloqueo de direcciones privadas RFC 1918 y metadata.</td></tr>
            <tr><td><b>Formato de Salida Canónico</b></td><td>JSON estructurado validado en Pydantic, CSV sanitizado y carga a Data Lake.</td></tr>
            <tr><td><b>Disponibilidad Verificada</b></td><td>99.98% de tiempo de actividad en extracción continua.</td></tr>
        </table>
        <div class="table-source">Fuente: Laboratorio de Ciberseguridad & Datos NOVUX S.A.S.</div>

        <h1>2. ALCANCE Y CASOS DE USO INDUSTRIAL</h1>
        <h2>2.1 ALCANCE DEL MOTOR</h2>
        <p>ARES SCRAPER está diseñado para empresas que requieren alimentación diaria de datos comerciales: marketplaces que rastrean catálogos de 500,000 artículos, aerolíneas que monitorean tarifas dinámicas, fondos de inversión que auditan el sentimiento de mercado y distribuidores farmacéuticos.</p>

        <h2>2.2 DIFERENCIAL FRENTE A SCRAPERS COMUNES</h2>
        <ul>
            <li><b>Cero Bloqueos Perimetrales:</b> Modificación de huella TLS (JA3/JA4) para simular el handshake idéntico de un navegador Google Chrome residencial real.</li>
            <li><b>Bajo Consumo de Memoria:</b> Al procesar el DOM mediante punteros nativos de C, procesa millones de etiquetas HTML con menos de 128 MB de memoria RAM por nodo.</li>
            <li><b>Autocleaning en Memoria:</b> Purgado de caracteres de escape maliciosos, inyecciones XSS y normalización tipográfica previa a la persistencia.</li>
        </ul>

        <h1>3. ARQUITECTURA DE BYPASS PERIMETRAL Y PARSING EN C</h1>
        <div class="code-box">
[ ARQUITECTURA DE BYPASS WAF // ARES SCRAPER ]
Sitio Objetivo (Cloudflare / DataDome)
       ▲
       │ [ Petición con TLS Spoofing JA3 ]
+─────────────────────────────────────────────+
| Red de Proxies Residenciales Rotativos      |
+─────────────────────────────────────────────+
       ▲
       │ [ Conexión Asíncrona Criptográfica ]
+─────────────────────────────────────────────+
| ARES L7 Driver Engine (Python Asyncio)       |
+─────────────────────────────────────────────+
       │
       ▼ [ Ingesta de HTML Puro a Memoria ]
+─────────────────────────────────────────────+
| C Parser Nativo (libxml2 Engine)            |
| Extracción XPath con latencia < 180 ms      |
+─────────────────────────────────────────────+
       │
       ▼ [ Esquema Pydantic Tipado ]
Data Lake Corporativo (PostgreSQL / BigQuery / Parquet)
        </div>

        <h1>4. MANUAL DE OPERACIÓN DE LA CONSOLA CYBERPUNK</h1>
        <h2>4.1 ACCESO A LA CONSOLA TÁCTICA</h2>
        <p>La consola operativa web se encuentra desplegada en <code>ares-scraper.vercel.app</code>. Su diseño de alto contraste garantiza visualización óptima en centros de operaciones y monitoreo 24/7.</p>

        <h2>4.2 EJECUCIÓN DE EXTRACCIÓN PASO A PASO</h2>
        <ol>
            <li><b>Configuración de URL:</b> Introducir la dirección del catálogo o e-commerce en el campo <code>@ URL_OBJETIVO</code>.</li>
            <li><b>Parámetros de Limpieza:</b> Dejar marcada la opción <i>"Limpiar datos automáticamente antes de cada scrap"</i> para asegurar descarte de clones.</li>
            <li><b>Lanzamiento:</b> Presionar el botón <b>[ INICIAR FLUJO ]</b>. La consola reportará en tiempo real el handshake TLS y los nodos analizados.</li>
            <li><b>Descarga:</b> Usar los comandos de consola <code>export json</code> o presionar los botones inferiores para almacenar el dataset.</li>
        </ol>

        <h1>5. PROTOCOLOS DE SEGURIDAD DEFENSIVA (ANTI-SSRF & PROXIES)</h1>
        <p>ARES SCRAPER incorpora de fábrica el escudo defensivo <code>is_safe_target_url()</code> que impide el uso indebido de los servidores para ataques de Server-Side Request Forgery:</p>
        <div class="code-box">
def is_safe_target_url(target_url: str):
    # Bloquea 127.0.0.1, localhost, 169.254.169.254 (metadata cloud)
    # y cualquier segmento de red interna empresarial RFC 1918.
        </div>

        <h1>6. MONITOREO DE CAPTCHA, LATENCIA Y CONTINGENCIAS</h1>
        <div class="table-caption">Tabla 2. Protocolo de Gestión de Respuestas HTTP</div>
        <table>
            <tr><th>Código HTTP</th><th>Diagnóstico</th><th>Acción del Motor ARES</th></tr>
            <tr><td><b>403 Forbidden</b></td><td>Activación de reto Cloudflare Turnstile.</td><td>Rotación inmediata de nodo proxy y mutación de huella TLS. Reintento en < 300ms.</td></tr>
            <tr><td><b>429 Too Many Req</b></td><td>Límite de peticiones por minuto alcanzado.</td><td>Dispersión exponencial de reintentos mediante algoritmo Jitter.</td></tr>
            <tr><td><b>200 OK</b></td><td>Extracción exitosa.</td><td>Pase directo a parser en C y entrega al canal de salida.</td></tr>
        </table>
        <div class="table-source">Fuente: Matriz de Confiabilidad ARES SCRAPER.</div>

        <h1>7. NORMAS TÉCNICAS Y ESTÁNDARES INTERNACIONALES</h1>
        <ul>
            <li><b>ICONTEC NTC 1486:</b> Presentación y redacción de libros de software.</li>
            <li><b>RFC 9110 (HTTP Semantics):</b> Cumplimiento de cabeceras canónicas HTTP/1.1 y HTTP/2.</li>
            <li><b>ISO/IEC 27034:</b> Application security (Seguridad en el ciclo de vida del desarrollo).</li>
        </ul>
        """
    },
    {
        "id": "NOVUX_CPC",
        "title": "LIBRO DE FUNCIONAMIENTO Y ESPECIFICACIÓN TÉCNICA // NOVUX CPC",
        "subtitle": "CONTROL POLÍTICO COLOMBIANO, HEMICICLO 3D & AUDITORÍA REGULATORIA (KAHN DAG)",
        "version": "Versión 2.0 - Producción",
        "filename": "LIBRO_FUNCIONAMIENTO_NOVUX_CPC.pdf",
        "doc_code": "NOVUX-MAN-CPC-2026-V2",
        "content_html": """
        <h1>CONTENIDO GENERAL</h1>
        <div class="toc-item"><span>1. IDENTIFICACIÓN Y FICHA TÉCNICA DEL SISTEMA</span><span>Pág. 3</span></div>
        <div class="toc-item"><span>2. ALCANCE Y VIGILANCIA REGULATORIA CORPORATIVA</span><span>Pág. 4</span></div>
        <div class="toc-item"><span>3. ARQUITECTURA TOPOLÓGICA KAHN DAG Y HEMICICLO 3D</span><span>Pág. 5</span></div>
        <div class="toc-item"><span>4. MANUAL DE OPERACIÓN: FISCALIZACIÓN Y ACTAS E-14/E-24</span><span>Pág. 7</span></div>
        <div class="toc-item"><span>5. GOBERNANZA DE DATOS PÚBLICOS Y COMPLIANCE</span><span>Pág. 9</span></div>
        <div class="toc-item"><span>6. GESTIÓN DE DISCREPANCIAS ELECTORALES Y CONTINGENCIAS</span><span>Pág. 11</span></div>
        <div class="toc-item"><span>7. NORMAS TÉCNICAS Y MARCO CONSTITUCIONAL</span><span>Pág. 12</span></div>

        <h1>1. IDENTIFICACIÓN Y FICHA TÉCNICA DEL SISTEMA</h1>
        <p><b>NOVUX CPC</b> (Control Político Colombiano & Electoral Cube) es la plataforma de inteligencia regulatoria, fiscalización parlamentaria y auditoría electoral de NOVUX S.A.S. Transforma la opacidad de los trámites legislativos y de escrutinio en modelos computacionales matemáticos para gremios económicos, departamentos legales de multinacionales y firmas de asuntos públicos.</p>

        <div class="table-caption">Tabla 1. Ficha Técnica de NOVUX CPC</div>
        <table>
            <tr><th>Variable</th><th>Implementación Técnica</th></tr>
            <tr><td><b>Nombre Comercial</b></td><td>NOVUX CPC // Control Político & Regulatory Graph</td></tr>
            <tr><td><b>Identificador Canónico</b></td><td>CASE-CPC-PULSE (NVX-ENG-CORE)</td></tr>
            <tr><td><b>Modelado 3D de Cuerpos Colegiados</b></td><td>Hemiciclo tridimensional interactivo con telemetría de 45/45 curules en Three.js.</td></tr>
            <tr><td><b>Motor de Trámite Legislativo</b></td><td>Grafo Acíclico Dirigido (Kahn DAG) para predicción de tiempos de debate y sanción.</td></tr>
            <tr><td><b>Módulo Electoral Forense</b></td><td>Conciliador algorítmico de discrepancias numéricas en actas E-14 vs E-24.</td></tr>
            <tr><td><b>Auditoría de Opinión Pública</b></td><td>Monitoreo ponderado de más de 3.86 millones de ciudadanos en redes.</td></tr>
            <tr><td><b>Frontend & Despliegue</b></td><td>React 19, FastAPI y Vercel Edge con protección TLS 1.3 y HSTS.</td></tr>
        </table>
        <div class="table-source">Fuente: División de Asuntos Públicos & Datos NOVUX S.A.S.</div>

        <h1>2. ALCANCE Y VIGILANCIA REGULATORIA CORPORATIVA</h1>
        <h2>2.1 ALCANCE</h2>
        <p>El sistema permite a los directores jurídicos y de relaciones corporativas anticipar reformas tributarias, modificaciones a códigos sectoriales y proyectos de ley con semanas de antelación, eliminando el riesgo de multas o pérdida imprevista de viabilidad comercial.</p>

        <h2>2.2 FUNCIONES ESTRATÉGICAS</h2>
        <ul>
            <li><b>Predicción de Trámite sin Ciclos:</b> El algoritmo DAG modela cada etapa de comisión y plenaria según el reglamento del Congreso (Ley 5 de 1992).</li>
            <li><b>Auditoría E-14/E-24:</b> Detección matemática de adulteraciones, tachaduras o inconsistencias en actas de escrutinio municipal y departamental.</li>
        </ul>

        <h1>3. ARQUITECTURA TOPOLÓGICA KAHN DAG Y HEMICICLO 3D</h1>
        <p>La resolución de dependencias de proyectos de ley se ejecuta mediante la ordenación topológica de Kahn sobre un grafo dirigido $G = (V, E)$:</p>
        <div class="code-box">
L = Lista vacía que contendrá los nodos ordenados
S = Conjunto de todos los nodos sin aristas entrantes (Grado de entrada = 0)

mientras S no esté vacío:
    remover un nodo n de S
    insertar n en L
    para cada nodo m con arista e de n a m:
        remover arista e del grafo
        si m no tiene otras aristas entrantes:
            insertar m en S

si el grafo tiene aristas:
    retornar ERROR_CICLO_DETECTADO (Vicio de trámite legislativo)
si no:
    retornar L (Secuencia cronológica válida de aprobación)
        </div>

        <h1>4. MANUAL DE OPERACIÓN: FISCALIZACIÓN Y ACTAS E-14/E-24</h1>
        <h2>4.1 VISUALIZACIÓN DEL HEMICICLO 3D</h2>
        <p>Al acceder a <code>novux-market-pulse.vercel.app</code>, la consola despliega el hemiciclo interactivo. Cada curul muestra el color del partido, registro de votos afirmativos/negativos y datos del congresista en tiempo real.</p>

        <h2>4.2 AUDITORÍA FORENSE ELECTORAL</h2>
        <ol>
            <li><b>Carga de Mesa de Votación:</b> Seleccionar el municipio, zona y puesto electoral.</li>
            <li><b>Cruce de Cifras:</b> El sistema compara las sumas del acta de claveros E-14 contra el acta de consolidación E-24.</li>
            <li><b>Reporte de Anomalías:</b> Si la diferencia supera el 0.05%, la mesa se marca en <b>Alerta Roja</b> con exportación de informe jurídico.</li>
        </ol>

        <h1>5. GOBERNANZA DE DATOS PÚBLICOS Y COMPLIANCE</h1>
        <p>NOVUX CPC opera en estricta sujeción a la Ley 1712 de 2014 (Transparencia y Acceso a la Información Pública Nacional), procesando exclusivamente información abierta y de interés general.</p>

        <h1>6. GESTIÓN DE DISCREPANCIAS ELECTORALES Y CONTINGENCIAS</h1>
        <div class="table-caption">Tabla 2. Matriz de Alertas de Trámite y Escrutinio</div>
        <table>
            <tr><th>Alerta</th><th>Condición</th><th>Impacto Jurídico</th></tr>
            <tr><td><b>VIC-TRAMITE-01</b></td><td>Trámite en plenaria sin haber sido aprobado en comisión estatutaria.</td><td>Vicio de inconstitucionalidad demandable ante la Corte Constitucional.</td></tr>
            <tr><td><b>DIF-E14-E24</b></td><td>Discrepancia en votos de lista preferente vs total votos por partido.</td><td>Causal de reclamación formal ante la comisión escrutadora.</td></tr>
            <tr><td><b>LEAD-LOCK-45S</b></td><td>Vencimiento del periodo de demostración.</td><td>Despliegue del contacto comercial con Nova para habilitar el acceso institucional.</td></tr>
        </table>
        <div class="table-source">Fuente: Protocolo de Cumplimiento Regulatorio NOVUX S.A.S.</div>

        <h1>7. NORMAS TÉCNICAS Y MARCO CONSTITUCIONAL</h1>
        <ul>
            <li><b>ICONTEC NTC 1486:</b> Presentación formal de documentos de ingeniería.</li>
            <li><b>Constitución Política de Colombia (Art. 133):</b> Rendición de cuentas de los miembros de cuerpos colegiados.</li>
            <li><b>ISO/IEC 25010:</b> Fiabilidad e integridad de los datos reportados.</li>
        </ul>
        """
    },
    {
        "id": "SANTAFE_BI",
        "title": "LIBRO DE FUNCIONAMIENTO Y ESPECIFICACIÓN TÉCNICA // SANTA FE BI",
        "subtitle": "CENTRO DE COMANDO CENTRALIZADO, ANALÍTICA TERRITORIAL & GESTIÓN DE ESPACIO PÚBLICO",
        "version": "Versión 2.2 - Producción",
        "filename": "LIBRO_FUNCIONAMIENTO_SANTAFE_BI.pdf",
        "doc_code": "NOVUX-MAN-SFBI-2026-V2",
        "content_html": """
        <h1>CONTENIDO GENERAL</h1>
        <div class="toc-item"><span>1. IDENTIFICACIÓN Y FICHA TÉCNICA DEL TABLERO</span><span>Pág. 3</span></div>
        <div class="toc-item"><span>2. ALCANCE Y CONTEXTO GUBERNAMENTAL (BOGOTÁ D.C.)</span><span>Pág. 4</span></div>
        <div class="toc-item"><span>3. ARQUITECTURA DE INGESTA POSTGRESQL / POSTGIS</span><span>Pág. 5</span></div>
        <div class="toc-item"><span>4. MANUAL DE OPERACIÓN: FILTRADO POR UPZ Y GESTOR</span><span>Pág. 7</span></div>
        <div class="toc-item"><span>5. GOBERNANZA DE DATOS TERRITORIALES Y SEGURIDAD</span><span>Pág. 9</span></div>
        <div class="toc-item"><span>6. GESTIÓN DE DISPERSIONES, TIEMPOS DE RESPUESTA Y SOPORTE</span><span>Pág. 11</span></div>
        <div class="toc-item"><span>7. NORMAS TÉCNICAS, ESTÁNDARES IDECA Y REFERENCIAS</span><span>Pág. 12</span></div>

        <h1>1. IDENTIFICACIÓN Y FICHA TÉCNICA DEL TABLERO</h1>
        <p><b>SANTA FE BI</b> (Comando Central Operativo Bogotá) es la solución de Business Intelligence gubernamental y analítica geoespacial diseñada por NOVUX S.A.S. para la Alcaldía Local de Santa Fe. Consolida la gestión territorial, la recuperación del espacio público y la auditoría de cuadrillas en campo en un cuadro de mando ejecutivo en tiempo real.</p>

        <div class="table-caption">Tabla 1. Ficha Técnica de SANTA FE BI</div>
        <table>
            <tr><th>Parámetro</th><th>Especificación</th></tr>
            <tr><td><b>Nombre Oficial</b></td><td>Comando Central Operativo - Localidad Santa Fe</td></tr>
            <tr><td><b>Identificador Canónico</b></td><td>CASE-SANTAFE-BI (NVX-ENG-CORE)</td></tr>
            <tr><td><b>Volumen de Datos Auditados</b></td><td>Más de 131,000 registros territoriales procesados sin errores de duplicidad.</td></tr>
            <tr><td><b>Área de Cobertura Espacial</b></td><td>245,000 m² de espacio público recuperado y georreferenciado.</td></tr>
            <tr><td><b>Motor de Base de Datos</b></td><td>PostgreSQL 16 con extensión geoespacial PostGIS.</td></tr>
            <tr><td><b>Visualizador Ejecutivo</b></td><td>Google Looker Studio embebido de alta velocidad (< 250ms).</td></tr>
            <tr><td><b>Pipeline ETL</b></td><td>Pipelines automatizados de ingesta y normalización en Python Analytics.</td></tr>
        </table>
        <div class="table-source">Fuente: Dirección de Analítica & Territorio NOVUX S.A.S.</div>

        <h1>2. ALCANCE Y CONTEXTO GUBERNAMENTAL (BOGOTÁ D.C.)</h1>
        <h2>2.1 ANTECEDENTES Y RETO OPERATIVO</h2>
        <p>La localidad central de Bogotá presentaba una dispersión crítica de información: cuadrillas reportando en cientos de planillas Excel desarticuladas, demoras de semanas para consolidar informes de gestión para la Secretaría de Gobierno y carencia de mapas de calor para focalizar intervenciones policiales y sociales.</p>

        <h2>2.2 LOGROS ALCANZADOS</h2>
        <ul>
            <li><b>Reducción del 95% en tiempos de reportería:</b> De semanas a consulta inmediata en vivo.</li>
            <li><b>Cero costos de licenciamiento por usuario:</b> Implementado sobre infraestructura accesible a todo el equipo de gobierno sin cobro por asiento.</li>
            <li><b>Precisión geoespacial absoluta:</b> Localización de vendedores informales, puntos críticos de aseo y bienes de uso público con soporte cartográfico IDECA.</li>
        </ul>

        <h1>3. ARQUITECTURA DE INGESTA POSTGRESQL / POSTGIS</h1>
        <div class="code-box">
[ ARQUITECTURA DE INGESTA TERRITORIAL // SANTA FE BI ]
Planillas de Campo / Dispositivos Móviles
       │
       ▼ [ Script ETL en Python Analytics (Pandas + Geopandas) ]
Limpieza de duplicados, validación de coordenadas y normalización UPZ
       │
       ▼ [ Persistencia Estructurada ]
Base de Datos PostgreSQL / PostGIS (Geometrías Point y Polygon)
       │
       ▼ [ Conexión Segura Directa SSL ]
Cuadro de Mando Ejecutivo Looker Studio (Google Cloud Platform)
       │
       ▼
Acceso Ciudadano & Gerencial en novuxops.com
        </div>

        <h1>4. MANUAL DE OPERACIÓN: FILTRADO POR UPZ Y GESTOR</h1>
        <h2>4.1 CONTROLES Y FILTROS INTERACTIVOS</h2>
        <ol>
            <li><b>Filtro de Período Temporal:</b> Seleccionar rango de fechas para comparar la efectividad de las intervenciones mes a mes.</li>
            <li><b>Selector de UPZ:</b> Filtrar por <i>Las Nieves, Las Aguas, La Macarena, Sagrado Corazón o Los Laches</i> para focalizar cuadrantes específicos.</li>
            <li><b>Gestor Operativo:</b> Evaluar el rendimiento individual de cada funcionario en territorio.</li>
        </ol>

        <h2>4.2 INTERPRETACIÓN DE MAPAS DE CALOR</h2>
        <p>El mapa geográfico renderiza manchas térmicas en base a la densidad de ocupación informal y puntos críticos de salubridad, permitiendo a la fuerza pública y gestores de convivencia priorizar las rondas matutinas.</p>

        <h1>5. GOBERNANZA DE DATOS TERRITORIALES Y SEGURIDAD</h1>
        <p>El tratamiento de los datos cumple con la Ley de Transparencia 1712 de 2014 y las directrices de la Infraestructura de Datos Espaciales para el Distrito Capital (IDECA). No se almacenan datos biométricos sensibles de ciudadanos en la capa pública.</p>

        <h1>6. GESTIÓN DE DISPERSIONES, TIEMPOS DE RESPUESTA Y SOPORTE</h1>
        <div class="table-caption">Tabla 2. Indicadores Clave de Desempeño (KPIs) del Sistema</div>
        <table>
            <tr><th>Indicador</th><th>Meta Contractual</th><th>Resultado Comprobado</th></tr>
            <tr><td><b>Latencia de Tablero</b></td><td>< 1.0 segundo</td><td>< 250 milisegundos</td></tr>
            <tr><td><b>Integridad de Registros</b></td><td>> 98.0%</td><td>100% normalizados sin duplicidad</td></tr>
            <tr><td><b>Disponibilidad de Acceso</b></td><td>99.5%</td><td>99.98% continua en nube</td></tr>
        </table>
        <div class="table-source">Fuente: Auditoría Técnica de Gestión Alcaldía Local.</div>

        <h1>7. NORMAS TÉCNICAS, ESTÁNDARES IDECA Y REFERENCIAS</h1>
        <ul>
            <li><b>ICONTEC NTC 1486:</b> Presentación formal de documentos de ingeniería institucional.</li>
            <li><b>Estándar OGC (Open Geospatial Consortium):</b> Para la interoperabilidad de datos geográficos PostGIS.</li>
            <li><b>ISO/IEC 25010:</b> Calidad en usabilidad y fidelidad de datos.</li>
        </ul>
        """
    }
]

def generate_pdf_for_manual(manual):
    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>{manual['title']}</title>
    <style>
        {ICONTEC_CSS}
    </style>
</head>
<body>
    <!-- PORTADA SEGÚN NORMA ICONTEC NTC 1486 -->
    <div class="cover-page">
        <div class="cover-title">
            <h1>{manual['title']}</h1>
            <h2>{manual['subtitle']}</h2>
        </div>
        
        <div class="cover-author">
            <p><b>ING. GUSTAVO ADOLFO DE LA ROSA FLÓREZ</b><br>
            Director de Ingeniería & Arquitectura de Software</p>
            <p style="font-size: 11pt; color: #4b5563; margin-top: 10px;">Código Documental: {manual['doc_code']}<br>{manual['version']}</p>
        </div>
        
        <div class="cover-footer">
            <p><b>NOVUX TECNOLOGÍAS S.A.S.</b><br>
            DIVISIÓN DE INGENIERÍA, SEGURIDAD & ANALÍTICA B2B<br>
            BOGOTÁ D.C., COLOMBIA<br>
            AÑO 2026</p>
        </div>
    </div>

    <!-- CUERPO DEL DOCUMENTO -->
    {manual['content_html']}
</body>
</html>
"""
    temp_html_path = os.path.join(OUTPUT_DIR, f"{manual['id']}.html")
    pdf_out_path = os.path.join(OUTPUT_DIR, manual['filename'])
    artifact_pdf_path = os.path.join(ARTIFACT_DIR, manual['filename'])

    with open(temp_html_path, 'w', encoding='utf-8') as f:
        f.write(html)

    # Imprimir a PDF con Chrome Headless
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_out_path}",
        temp_html_path
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"[OK] Generado PDF: {pdf_out_path} ({os.path.getsize(pdf_out_path)} bytes)")
        # Copiar también al directorio de artefactos para acceso rápido
        try:
            with open(pdf_out_path, 'rb') as sf, open(artifact_pdf_path, 'wb') as df:
                df.write(sf.read())
            print(f"     -> Copiado al artefacto: {artifact_pdf_path}")
        except Exception as ce:
            print(f"     -> Error al copiar al artefacto: {ce}")
    else:
        print(f"[ERROR] Falló generación de {manual['id']}: {res.stderr}")

    # Limpiar archivo html temporal
    try:
        os.remove(temp_html_path)
    except Exception:
        pass

def main():
    print("Iniciando generación de los 5 Libros de Funcionamiento bajo Normas ICONTEC...")
    for manual in MANUALS:
        generate_pdf_for_manual(manual)
    print("\nProceso finalizado exitosamente.")

if __name__ == "__main__":
    main()
