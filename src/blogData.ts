import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
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
