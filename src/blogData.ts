import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
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
