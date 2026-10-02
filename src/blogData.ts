import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: '3',
    slug: 'novux-eng-001-realidad-extraccion-datos-l7-web-scraping',
    title: 'La Realidad de la Extracción de Datos L7 — Topología del Web Scraping, Pipelines de Ingesta Masiva y Fronteras Operativas frente a la Intrusión Informática',
    description: 'Desglose de primeros principios sobre la física del tránsito en red (Capa 7), epistemología de los datos que alimentan a los LLMs, pipelines de baja memoria con libxml2 en C y deduplicación probabilística MinHash/LSH.',
    date: '2026-10-01',
    readingTime: '8 min de lectura / Paper Técnico',
    tags: ['web-scraping', 'capa-7-osi', 'data-engineering', 'minhash-lsh', 'llm-training', 'libxml2-c', 'pydantic', 'novux-eng'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=bK3EwIMHm94',
    author: {
      name: 'Gustavo Alberto de la Rosa Flórez',
      role: 'Lead Architect • NOVUX D&D (Developer & Data)'
    },
    content: `**Entorno Operativo:** NOVUX D&D (Developer & Data)  
**ID Documento:** NOVUX-ENG-001  
**Autor:** Gustavo Alberto de la Rosa Flórez  
**Clasificación:** Paper Técnico / Bitácora de Ingeniería  

---

### Epistemología Inicial: El Minado de Datos y el Cimiento de la Inteligencia Artificial

Hoy en día sabemos que la realidad es que **no existe una inteligencia generalizada**; la verdad es que son muchas máquinas divididas, cada una ejecutando una tarea excepcionalmente bien. ¿Y cómo entra el web scraping en este punto? 

Sencillo: una máquina tiene que alimentarse de datos. La mejor forma de entrenar un modelo para que sea realmente bueno es hacerlo a través de datos; al principio datos públicos y después con datos privados, otorgándole una lógica estricta para ejecutar una tarea. El web scraping se diseñó primero para encontrar información y después se automatizó para alimentar la mente de un **niño digital** que carece de cansancio y de sesgos: solo le importa hacer bien su tarea sin importar cuántas veces fracase; un principio filosófico que nos obliga a cuestionar nuestras propias características humanas.

Todo empieza con un protocolo de enlace. De ahí en adelante, como si habláramos de estructuras místicas, nos adentramos en la raíz de un árbol donde el dulce fruto no es más que el **dato en bruto del conocimiento**. Como si se tratara de una historia bíblica, desglosamos cada interacción requerida por un servidor remoto hasta probar el elixir de la tarea completada: extrayendo por medio de filtros una proyección semántica que no requiere vulnerar autenticaciones, sino comprender y saber adaptarse al árbol que visita. Como diría la regla fundamental: *toda investigación depende del entorno en el que se realiza*.

---

### 1. Desglose de Primeros Principios: La Física del Tránsito en Red

El web scraping suele malinterpretarse como una técnica de intrusión o un script artesanal de búsqueda ciega de texto. Desde la perspectiva de la arquitectura de sistemas, es la **automatización programática de la capa de aplicación (Capa 7 del modelo OSI)** orientada a la extracción, normalización y tipado de datos públicos transmitidos mediante protocolos de hipertexto (HTTP/HTTPS).

El ciclo fundamental de vida del dato sigue un flujo determinista:

\`\`\`
[Servidor Web Remoto]
       │
       ▼  (Payload en Tránsito: Bytes TCP/IP - Capas L3/L4)
[Socket / Cliente HTTP (Handshake TLS)]
       │
       ▼  (Buffer de Memoria: Stream crudo de bytes / UTF-8)
[Parser Sintáctico (libxml2 / C)]
       │
       ▼  (DOM en RAM: Jerarquía de Nodos y Punteros)
[Proyección Semántica (XPath / CSS Selectors)]
       │
       ▼  (Deduplicación & Hash: MinHash / LSH)
[Validación Canónica (Pydantic / Tipado Estricto)]
       │
       ▼
[Persistencia (Parquet / Tablas SQL / Storage / Model Training)]
\`\`\`

---

### 1.1. Delimitación Operativa: Scraping vs. Intrusión Informática

La frontera técnica y jurídica entre el consumo automatizado y la intrusión radica en el vector de acceso y la alteración de estado:

| Vector | Web Scraping (Ingeniería L7) | Intrusión Informática (Hacking) |
| :--- | :--- | :--- |
| **Autenticación** | Consume endpoints e hipertexto públicos sin requerir credenciales ni forzar accesos. | Evade o vulnera mecanismos de control de acceso (Auth Bypass, Inyecciones, SQLi). |
| **Operación HTTP** | Operaciones idempotentes de solo lectura (\`GET\`). | Mutaciones de estado no autorizadas (\`POST\`, \`PUT\`, \`DELETE\`, \`DROP\`). |
| **Integridad del Dato** | Extrae la representación del estado que el servidor emite voluntariamente a la red. | Modifica la base de datos o altera registros en el host remoto. |
| **Naturaleza del Cliente** | Idéntico a un navegador headless; solicita los mismos bytes que un usuario común. | Explotación de vulnerabilidades en buffers, ejecución remota de código (RCE). |

> **Principio de Identidad Estructural:** El navegador comercial (*Chrome, Edge, Firefox*) es, por definición estructural, un motor de scraping automatizado acoplado a un motor gráfico de renderizado visual para consumo humano. El scraper de ingeniería de NOVUX prescinde de la capa gráfica para optimizar ancho de banda, consumo de RAM y ciclos de CPU.

---

### 2. Epistemología del Dato: El Cimiento Silente de los Modelos de Lenguaje

Antes de la explosión comercial de la Inteligencia Artificial moderna, operó una infraestructura invisible de extracción masiva. La computación cognitiva actual no emergió de un vacío algorítmico, sino de la capacidad de ingestar, normalizar y comprimir el hipertexto público global acumulado durante tres décadas.

Una red neuronal profunda carece de entendimiento místico: es una estructura matricial calibrada estadísticamente. Para que un modelo adquiera coherencia semántica en lenguaje natural, requirió consumir billones de tokens distribuidos en la web abierta mediante iniciativas como Common Crawl y pipelines de scraping masivo:

\`\`\`
[ Web Abierta Heterogénea ]
       │
       ▼  (Scraping L7 Masivo / Entropía Máxima)
[ Corpus Crudo Textual (UTF-8) ]
       │
       ▼  (Normalización & Deduplicación MinHash / LSH)
[ Dataset Curado ]
       │
       ▼  (Tokenización BPE / WordPiece)
[ Tensores y Pesos de Red Neuronal ]
\`\`\`

El extractor no busca palabras como quien pasa un detector de metales; ejecuta una **proyección semántica sobre estructuras invariantes**. El texto superficial cambia; la topología de los árboles que lo contienen permanece constante. Quien domina la extracción del árbol, domina el suministro del modelo.

---

### 3. Arquitectura del Pipeline de Ingesta: Memoria, Parsing y Deduplicación

Procesar datos a escala exige optimizar el uso de recursos computacionales. No es lo mismo analizar un string en Python puro que parsear gigabytes por segundo en memoria nativa de bajo nivel.

#### 3.1. Buffers de Memoria y Parsing C vs. Python Puro
El lenguaje Python delega la gestión de memoria a su recolector de basura y añade una sobrecarga considerable por objeto (*overhead de PyObject*). Parsear árboles HTML extensos con librerías basadas en Python puro (como el parser nativo de \`html.parser\`) genera un consumo excesivo de memoria por cada etiqueta (\`Node\`).

Para producción, la ingesta debe apoyarse en **libxml2** (a través de \`lxml\` en Python) o bindings en Rust/C++:
* **C-Level Parsing:** \`lxml\` mapea el árbol del documento directamente en memoria C contigua mediante punteros a estructuras \`xmlNode\`.
* **Zero-Copy o Chunk Streaming:** En lugar de cargar archivos completos de 500 MB en la RAM de Python, se consumen buffers de bytes por bloques (*chunks*) usando generadores e iteradores de eventos (\`iterparse\`).

#### 3.2. Deduplicación Masiva mediante MinHash y Locality-Sensitive Hashing (LSH)
Cuando se extraen millones de documentos, el almacenamiento redundante degrada el pipeline. Comparar cada documento nuevo contra todos los existentes requiere una complejidad temporal cuadrática $\\mathcal{O}(N^2)$, inviable en escala.

La técnica estándar de deduplicación semántica opera en tres fases matemáticas:
1. **Shingling (N-gramas):** Descomponer el texto extraído en subconjuntos de palabras consecutivas ($k$-shingles).
2. **MinHash:** Aplicar una familia de $m$ funciones hash independientes para proyectar el conjunto de shingles a una firma de tamaño fijo ($m$ enteros). La probabilidad de colisión entre dos firmas aproxima con exactitud el Coeficiente de Similitud de Jaccard:

$$J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|}$$

3. **Locality-Sensitive Hashing (LSH):** Agrupar las firmas MinHash en sub-bandas. Los documentos con firmas idénticas en al menos una banda se identifican como duplicados en tiempo lineal $\\mathcal{O}(N)$.

---

### 4. Implementación Técnica de Producción

A continuación se detalla la implementación modular de un pipeline desacoplado que integra:
* Consumo por chunks sin saturar memoria.
* Parsing compilado en C con selectores XPath relativos sobre contexto acotado.
* Tipado canónico estricto mediante Pydantic.
* Generación de firmas MinHash para deduplicación inmediata.

\`\`\`python
"""
NOVUX Data & Development - Production Scraping & Deduplication Pipeline
Engineered for low-memory overhead and strict structural parsing.
"""

from typing import Generator, List, Set
import hashlib
import binascii
from lxml import etree
from pydantic import BaseModel, Field, HttpUrl


class CanonicalProduct(BaseModel):
    """Esquema canónico fuertemente tipado."""
    sku: str = Field(..., min_length=1)
    name: str = Field(..., min_length=2)
    price: float = Field(..., gt=0.0)
    url: HttpUrl
    minhash_signature: List[int] = Field(default_factory=list)


class MinHashDeduplicator:
    """Motor de deduplicación de huella sintáctica mediante MinHash."""
    def __init__(self, num_perm: int = 64, seed: int = 42):
        self.num_perm = num_perm
        self.seed = seed
        # Coeficientes lineales pseudo-aleatorios (a * x + b) % c
        self._prime = 4294967311  # 2^32 - 5
        self._a = [((i * 10007 + seed) % (self._prime - 1)) + 1 for i in range(num_perm)]
        self._b = [((i * 20011 + seed * 3) % self._prime) for i in range(num_perm)]

    def _get_shingles(self, text: str, k: int = 3) -> Set[int]:
        tokens = text.lower().split()
        if len(tokens) < k:
            return {binascii.crc32(text.encode('utf-8')) & 0xFFFFFFFF}
        
        shingles = set()
        for i in range(len(tokens) - k + 1):
            shingle = " ".join(tokens[i:i + k])
            shingles.add(binascii.crc32(shingle.encode('utf-8')) & 0xFFFFFFFF)
        return shingles

    def compute_signature(self, text: str) -> List[int]:
        shingles = self._get_shingles(text)
        signature = []
        for a, b in zip(self._a, self._b):
            min_val = float('inf')
            for s in shingles:
                val = (a * s + b) % self._prime
                if val < min_val:
                    min_val = val
            signature.append(int(min_val))
        return signature


class ScopedDOMParser:
    """Parser estructural de alto rendimiento basado en libxml2 (C-level)."""
    
    @staticmethod
    def parse_stream(html_bytes: bytes, base_url: str) -> Generator[CanonicalProduct, None, None]:
        deduper = MinHashDeduplicator(num_perm=32)
        
        # C-level parsing de árbol en memoria contigua
        parser = etree.HTMLParser(recover=True, remove_blank_text=True)
        tree = etree.fromstring(html_bytes, parser=parser)
        
        # Context Partitioning: Particionar sobre contenedor antes de descender
        product_nodes = tree.xpath("//article[contains(@class, 'product-card')]")
        
        for node in product_nodes:
            try:
                # Proyección relativa directa (Scope local en RAM)
                sku_raw = node.xpath("./@data-sku")
                name_raw = node.xpath(".//h2[@class='title']/text()")
                price_raw = node.xpath(".//span[@class='price-val']/text()")
                
                if not (sku_raw and name_raw and price_raw):
                    continue
                
                name_clean = str(name_raw[0]).strip()
                price_val = float(str(price_raw[0]).replace("$", "").replace(",", "").strip())
                sku_clean = str(sku_raw[0]).strip()
                
                # Deduplicación semántica del registro extraído
                signature = deduper.compute_signature(name_clean)
                
                yield CanonicalProduct(
                    sku=sku_clean,
                    name=name_clean,
                    price=price_val,
                    url=f"{base_url}/catalog/{sku_clean}",
                    minhash_signature=signature
                )
            except (ValueError, etree.XPathError):
                continue
\`\`\`

---

### 5. Dictamen Técnico para Ingeniería y Mesa Editorial

* **Eficiencia en Capa 7:** Un scraper profesional no ejecuta scraping a ciegas ni parsea cadenas de texto plano con regex. Trabaja sobre la topología del DOM mediante motores de parsing en C, acotando el contexto de las consultas a nodos padre.
* **Escala y Pureza:** La extracción masiva que entrena la inteligencia artificial moderna no depende únicamente de la velocidad del socket, sino de los filtros matemáticos de deduplicación (MinHash/LSH) que evitan sesgos redundantes en el dataset final.
* **Legitimidad Técnica:** El scraping opera sobre la frontera del dato público, emitiendo peticiones estándar que devuelven el estado del servidor. Distinguir formalmente la recolección L7 de la alteración intrusiva de sistemas es indispensable para la madurez de la industria de datos.

---

### 6. Despacho Audiovisual & Masterclass

Para complementar este desglose de primeros principios sobre la epistemología del dato, la extracción en Capa 7 y la alimentación de modelos de lenguaje, recomendamos la masterclass técnica audiovisual incluida al pie de este documento:

*Agradecimiento y crédito especial a **El Pingüino de Mario** por el análisis técnico y divulgación audiovisual de ingeniería.*

#WebScraping #DataEngineering #OSIModel #Layer7 #MinHash #LSH #MachineLearning #LLMTraining #Python #libxml2 #Pydantic #NovuxOps #EngineeringPaper
`
  },
  {
    id: '2',
    slug: 'desmitificando-sql-del-cubo-al-algebra-relacional',
    title: 'Desmitificando SQL: De la intuición del cubo al Álgebra Relacional',
    description: 'A menudo se enseña SQL memorizando comandos sueltos. Formalizamos el modelo mental detrás de las consultas, conectando la intuición física de fichas y contenedores con la teoría de conjuntos y el procesamiento lógico de queries.',
    date: '2026-09-24',
    readingTime: '5 min de lectura',
    tags: ['sql', 'algebra-relacional', 'data-engineering', 'data-analytics', 'databases', 'modelo-mental'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Gustavo De La Rosa',
      role: 'Software Factory & Data Analytics • Bogotá, Colombia'
    },
    content: `A menudo se enseña SQL como si fuera simplemente memorizar comandos (\`SELECT\`, \`FROM\`, \`WHERE\`). Sin embargo, para dominar el análisis de datos hay que entender que SQL es un **lenguaje declarativo** fundamentado en la teoría de conjuntos y el álgebra relacional.

Hoy formalizamos el modelo mental detrás de las consultas SQL, conectando la intuición cotidiana con la base matemática y técnica rigurosa.

---

### 1. Mapeo Mental: De la Intuición a la Teoría

| Intuición (Modelo de Cubos) | Base Técnica (Álgebra Relacional & SQL) | Ejemplo Práctico |
| :--- | :--- | :--- |
| **Cubo / Fichero** (Contenedor global) | **Tabla / Relación / Conjunto** | Entidades como \`Clientes\` o \`Ventas\` |
| **Cualidad del casillero** (Propiedad) | **Columna / Atributo / Campo** | \`ID\`, \`Nombre\`, \`Fecha\`, \`Salario\` |
| **Ficha rellenada** (Dato concreto) | **Fila / Registro / Tupla** | Elemento individual: \`[45, Juan, 2024-03-12]\` |

---

### 2. El Viaje Lógico de una Consulta (*Logical Query Processing*)

SQL **no procesa** las instrucciones en el orden en que las escribimos en el editor (\`SELECT\` al inicio), sino en un orden lógico que transforma los datos paso a paso:

1. **CUBO INICIAL (\`FROM\`) & JUNTURA (\`JOIN\` / $\\bowtie$):** Identifica la tabla origen. Si se necesita cruzar información, conecta fichas de distintas tablas mediante un "cable" común (claves primarias y foráneas).
2. **FILTRADO HORIZONTAL (\`WHERE\` / Selección $\\sigma$):** Evalúa fila por fila y descarta sin piedad las fichas que no cumplen la condición dada.
3. **COLAPSO / AGRUPACIÓN (\`GROUP BY\` & \`HAVING\`):** Funde múltiples filas en resúmenes por categorías (ej. ventas por país) y aplica filtros a esos grupos consolidados.
4. **CORTE VERTICAL (\`SELECT\` / Proyección $\\pi$):** Realiza un corte vertical, conservando solo las columnas/atributos de interés e ignorando el resto.
5. **PRESENTACIÓN FINAL (\`ORDER BY\` & \`LIMIT\`):** Ordena las fichas resultantes y toma la muestra o paginación especificada.

---

### 💡 El Gran "Aha! Moment": La Propiedad de Clausura

Lo más potente de este modelo es la **Propiedad de Clausura**: 

> *La entrada de una consulta es una tabla (o conjunto de relaciones), y la salida **SIEMPRE** es otra tabla.*

Gracias a esto, el resultado de una consulta no es un punto muerto: queda listo en memoria para alimentar subconsultas, expresiones de tabla comunes (**CTEs** con \`WITH\`), vistas o tableros de control ejecutivos (*dashboards* analíticos).

---

### 3. Diccionario Operativo: Comandos y Analogías

| Palabra Clave | Función Técnica | Analogía (Cubos y Fichas / El Puntero) | Ejemplo Rápido |
| :--- | :--- | :--- | :--- |
| \`SELECT\` | Proyecta o extrae las columnas (cualidades) finales que deseas ver. | **El resaltador:** De todas las cualidades de la ficha, solo ilumina las que te interesan. | \`SELECT nombre, total\` |
| \`FROM\` | Especifica la tabla o conjunto origen de los datos. | **El almacén:** Indica en qué estantería o archivador físico se encuentra el cubo a consultar. | \`FROM ventas_2024\` |
| \`JOIN\` | Conecta dos o más tablas mediante una clave relacional compartida. | **El enlace magnético:** Junta dos fichas de distintos cubos uniendo sus extremos compatibles (FK $\\to$ PK). | \`INNER JOIN clientes ON ...\` |
| \`WHERE\` | Filtra registros individuales antes de cualquier agregación o agrupamiento. | **El colador inicial:** Deja caer y descarta al instante las fichas que no cumplen la regla. | \`WHERE total > 1000\` |
| \`GROUP BY\` | Colapsa y agrupa filas con valores idénticos en columnas clave. | **Los separadores:** Divide las fichas en montoncitos clasificados según una cualidad común. | \`GROUP BY region\` |
| \`HAVING\` | Filtra los grupos resultantes tras una agregación (\`SUM\`, \`AVG\`, \`COUNT\`). | **El colador secundario:** Descarta montoncitos enteros que no alcancen la cota establecida. | \`HAVING SUM(total) >= 50000\` |
| \`ORDER BY\` | Ordena las tuplas finales de forma ascendente o descendente. | **La clasificación manual:** Coloca las fichas de mayor a menor o por orden alfabético estricto. | \`ORDER BY fecha DESC\` |
| \`LIMIT\` | Restringe el número total de filas devueltas al cliente. | **La muestra:** Toma únicamente las primeras $N$ fichas del tope de la pila. | \`LIMIT 10\` |

#SQL #DataAnalytics #DataEngineering #RelationalAlgebra #Database #Novux #DataScience #LearningInPublic
`
  },
  {
    id: '1',
    slug: 'el-teclado-como-piano-en-la-matriz',
    title: 'El Teclado como Piano en la Matriz: Cómo Aprendí Python desde el Álgebra Lineal',
    description: 'Una reflexión sobre la deconstrucción lógica, el origen familiar del método y la representación tridimensional del código a través de transformaciones matriciales.',
    date: '2026-09-17',
    readingTime: '4 min de lectura',
    tags: ['python', 'algebra-lineal', 'data-science', 'desarrollo-backend', 'filosofia-codigo'],
    image: 'https://lh3.googleusercontent.com/d/1M4t3zE5LWhMIzptZDXzS-FU4ea3vKLzS=w1200',
    author: {
      name: 'Gustavo De La Rosa',
      role: 'Software Factory & Data Analytics • Bogotá, Colombia'
    },
    content: `Python se cruzó en mi camino allá por 2023. Me estalló en la cara como un lenguaje que venía a cambiar paradigmas —y así fue: transformó la industria hasta convertirse en el pilar fundamental de la inteligencia artificial moderna.

Tenía bases de programación por mis estudios de ingeniería; una carrera que no terminé, pero que dejó una puerta permanentemente abierta en mi conciencia. Después de todo, no hay nada que disfrute más que pasar horas frente al teclado. El teclado se siente como un piano: cada pulsación genera una música circundante, un compás rítmico que me produce un bienestar difícil de explicar. Me recuerda a mi madre frente a su máquina de escribir redactando ensayos universitarios; me recuerda a mi padre con sus giros creativos y palabras meticulosamente buscadas, a las que hoy admiro con método. Somos una familia de ideólogos.

En ese punto, Python llegó como el vehículo exacto para expresar mis ideas lógicas y deconstruir conceptos. Me permitió modelar objetos y flujos estructurados que evocaban el fondo metafórico de *The Matrix*: un torrente de datos en caída continua donde quien domina la sintaxis es quien realmente moldea la realidad.

Ahí nació una ambición clara: construir metodologías prácticas a partir de condicionales y bucles, recorriendo métodos e iteradores donde el código no se define por la complejidad innecesaria, sino por el minimalismo de su sintaxis. Hay una belleza singular en la idea de que una palabra sea un objeto, un objeto adquiera una forma y esa forma defina un contexto. Así se estructuró Python en mi mente.

A esto se sumó mi materia favorita en la universidad: álgebra lineal. Ver cómo las matrices y los espacios vectoriales transformaban el plano teórico en dimensiones operativas convirtió mi realidad en la analogía de un arreglo matricial. Python no llegó a mi vida por azar; llegó por la necesidad de interpretar el mundo desde la tridimensionalidad semántica de las palabras y los datos.

---

### La Representación: Del Concepto al Espacio Vectorial

Para materializar esta analogía en código reproducible, proyectamos cada idea hacia un tensor tridimensional donde cada eje representa un componente operativo ($X$: Lógica / Sintaxis, $Y$: Cadencia / Semántica, $Z$: Estructura / Abstracción).

A continuación, el script en NumPy que modela la proyección espacial y calcula el centroide semántico resultante. Puedes ejecutarlo en la consola interactiva para desplegar la proyección del plano vectorial en tiempo real:

\`\`\`python
import numpy as np

def proyeccion_espacio_semantico():
    """
    Mapea conceptos clave a coordenadas tridimensionales (X: Lógica, Y: Cadencia, Z: Estructura)
    y aplica una transformación lineal para representar la convergencia semántica.
    """
    # Coordenadas base en R^3: [Lógica, Cadencia/Ritmo, Estructura]
    conceptos = {
        "teclado": np.array([0.85, 0.95, 0.70]),
        "piano":   np.array([0.30, 0.98, 0.40]),
        "matriz":  np.array([0.95, 0.20, 0.95]),
        "codigo":  np.array([0.92, 0.70, 0.85]),
    }

    # Matriz de transformación lineal (pesos de integración)
    W = np.array([
        [1.0, 0.4, 0.2],
        [0.3, 1.0, 0.3],
        [0.2, 0.5, 1.0]
    ])

    espacio_vectorial = np.array(list(conceptos.values()))
    espacio_proyectado = np.dot(espacio_vectorial, W)
    
    # Centroide semántico del espacio
    centroide = np.mean(espacio_proyectado, axis=0)
    
    return f"Vector de Estado: {np.round(centroide, 3).tolist()} | Dim: {espacio_proyectado.shape}"

# Definición de la variable de estado
Esto_es_vida = f"{proyeccion_espacio_semantico()}"
print(Esto_es_vida)
\`\`\`
`
  }
];
