# Novux S.A.S. - Portafolio Digital B2B

Plataforma web de alto rendimiento (Single Page Application) desarrollada para la exhibición de capacidades en Software Factory, Data Analytics e Integración de IA. La arquitectura está diseñada bajo principios de eficiencia computacional, experiencia de usuario (UX) inmersiva y captación automatizada de leads.

## Arquitectura Técnica Aplicada

- **Core Stack:** React 19, TypeScript, Vite, Tailwind CSS v4.
- **Data-Driven UI (Desacoplamiento):** Implementación de diccionarios estáticos (`src/data.ts`) para aislar la lógica de visualización del contenido estructural. Habilita la inyección condicional de Call to Actions (CTAs) interconectados con Google Forms para el embudo de conversión B2B.
- **Renderizado Estocástico (HTML5 Canvas):** Ejecución de algoritmos matemáticos (`MatrixRain.tsx`) gestionados vía `requestAnimationFrame` para generar simulaciones visuales complejas a 60 FPS con un consumo optimizado de CPU/GPU.
- **Síntesis de Audio Nativa (Web Audio API):** Clase de utilería `SoundEffectsEngine` que compila oscilaciones matemáticas en tiempo real para la retroalimentación auditiva del usuario, erradicando la latencia de red al no depender de assets externos.
- **Transiciones Declarativas:** Orquestación de estados visuales asíncronos mediante `framer-motion`, sustituyendo manipulaciones directas del DOM y animaciones CSS tradicionales pesadas.
- **Enrutamiento de Vista Condicional:** Control maestro de navegación centralizado en `App.tsx` para permitir saltos entre módulos sin requerir peticiones HTTP adicionales ni recargas del navegador.