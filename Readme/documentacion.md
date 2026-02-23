
<div align="center">
  <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" width="200" alt="Spotify Logo">
  <br><br>
  <h1 style="color: #1db954; border-bottom: 2px solid #1db954; padding-bottom: 10px;">Proyecto LLMM: Clon de Spotify Web</h1>
</div>

<div style="background-color: #181818; color: #b3b3b3; padding: 20px; border-radius: 8px; border-left: 5px solid #1db954; margin-bottom: 30px;">
  <h2 style="color: #ffffff; margin-top: 0;">📋 Información General</h2>
  <ul>
    <p><b>Alumno: Noé Lucena Eisermann</b></p>
    <li><b>Asignatura:</b> Lenguajes de Marcas (LLMM)</li>
    <li><b>Objetivos:</b> 
      <ul>
        <li>Fase 1: Reproducir de forma literal la interfaz visual de Spotify Web (Desktop).</li>
        <li>Fase 2: Implementar Responsive Design (Tablet y Mobile) usando unidades fluidas, Flexbox, Grid y Media Queries.</li>
      </ul>
    </li>
  </ul>
</div>

<hr>

<h2 style="color: #1db954;">💻 FASE 1: Desktop (Estática)</h2>

<p>En esta primera fase, el objetivo fue crear la estructura base y lograr una copia literal (layout y estilos) con la aplicación de escritorio original.</p>

<h3>🏗️ Estructura Grid Principal</h3>

<pre style="background-color: #242424; color: #fff; padding: 15px; border-radius: 8px; overflow-x: auto;">
┌──────────────────────────────────────────────┐
│  Sidebar (Fijo)   │  Contenido Principal     │
│                   │                          │
│  ├─ Logo          │  ├─ Header (Sticky)      │
│  ├─ Navegación    │  ├─ Secciones (Scroll)   │
│  ├─ Biblioteca    │  └─ Footer Main          │
│  └─ Legal         │                          │
└──────────────────────────────────────────────┘
</pre>

<h3>🎨 Guía de Colores</h3>

| Color | Hex | Uso |
|-------|-----|-----|
| <span style="color:#1db954;">●</span> Verde Spotify | `#1db954` | Botón play, elementos activos |
| <span style="color:#121212;">●</span> Negro Fondo | `#121212` | Fondo principal |
| <span style="color:#000000;">●</span> Negro Oscuro | `#000000` | Sidebar |
| <span style="color:#181818;">●</span> Gris Oscuro | `#181818` | Contenido principal |
| <span style="color:#282828;">●</span> Gris Claro | `#282828` | Tarjetas |
| <span style="color:#ffffff;">●</span> Blanco | `#ffffff` | Texto principal |
| <span style="color:#b3b3b3;">●</span> Gris Texto | `#b3b3b3` | Texto secundario |

<h3>📸 Capturas Fase 1</h3>

<b>Web Original:</b><br>
<img src="img/image-2.png" alt="Web Original" style="max-width:100%; border-radius: 8px; margin-top: 10px;">
<br><br>

<b>Resultado Fase 1:</b><br>
<img src="img/image.png" alt="Copia Fase 1 - 1" style="max-width:100%; border-radius: 8px; margin-top: 10px;">
<br><br>
<img src="img/image-1.png" alt="Copia Fase 1 - 2" style="max-width:100%; border-radius: 8px; margin-top: 10px;">

<hr>

<h2 style="color: #1db954;">📱 FASE 2: Responsive Design (Tablet & Mobile)</h2>

<p>En esta segunda fase, el objetivo ha sido adaptar la página para que sea adaptable a la mayoría de dispositivos (Responsive en tablet, mobile y escritorio)</p>

<h3>📐 Breakpoints Utilizados</h3>
<p>Se definieron tres estados visuales controlados a través de Media Queries:</p>
<ul>
  <li><b>Desktop:</b> Mayor a <code>1024px</code> (Por defecto).</li>
  <li><b>Tablet:</b> <code>@media (max-width: 1024px)</code></li>
  <li><b>Mobile:</b> <code>@media (max-width: 600px)</code></li>
</ul>

<h3>🛠️ Retos Técnicos y Soluciones Implementadas</h3>

<div style="background-color: #242424; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
  <h4 style="color: #fff; margin-top: 0;">1. Carrusel de Tarjetas (Scroll Horizontal)</h4>
  <p style="color: #b3b3b3; font-size: 14px; margin-bottom: 0;">Tuve bastantes problemas para evitar que las tarjetas se apilaran verticalmente, así que tuve que modificar <code>.cards-grid</code> sustituyendo Grid por Flexbox (<code>display: flex; flex-wrap: nowrap;</code>). Apliqué <code>overflow-x: auto</code> para habilitar el scroll lateral, ocultando visualmente la barra de desplazamiento. Además, se fijó el ancho con <code>flex: 0 0 180px</code> (con ajustes menores en tablet/móvil) y se utilicé <code>flex-shrink: 0</code> en las imágenes para garantizar que no se deformaran.</p>
</div>

<div style="background-color: #242424; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
  <h4 style="color: #fff; margin-top: 0;">2. Reajuste de la Navbar y Superposiciones</h4>
  <p style="color: #b3b3b3; font-size: 14px; margin-bottom: 0;">Al encoger la pantalla, el buscador colisionaba con los botones laterales. Así que elimié el posicionamiento absoluto (<code>position: static !important</code>). En modo Tablet, el <code>input</code> de texto desaparece y el contenedor se transforma en un botón circular de 48x48px alineado a la izquierda junto al logo.</p>
</div>

<div style="background-color: #242424; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
  <h4 style="color: #fff; margin-top: 0;">3. Transformación del Layout Principal (Grid a Flex fluido)</h4>
  <p style="color: #b3b3b3; font-size: 14px; margin-bottom: 0;">
  - <b>Tablet:</b> El Sidebar lo hice de un tamaño fijo de <code>280px</code>, evitando que los textos internos colapsaran por falta de espacio.<br>
  - <b>Mobile:</b> El Sidebar desaparece por completo (<code>display: none</code>). La cuadrícula principal pasa de tener dos columnas a una sola (<code>grid-template-columns: 1fr</code>). El header se limpia mostrando únicamente el botón "Open App" y el icono de menú hamburguesa.
  </p>
</div>

<h3>📸 Capturas Fase 2 (Responsive)</h3>

<b>Vista Tablet (max-width: 1024px)</b>
<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; margin-top: 10px;">
  <img src="image-3.png" alt="Tablet 1" width="48%" style="border-radius: 4px;">
  <img src="image-4.png" alt="Tablet 2" width="48%" style="border-radius: 4px;">
  <img src="image-5.png" alt="Tablet 3" width="48%" style="border-radius: 4px;">
  <img src="image-1.png" alt="Tablet Inicios" width="48%" style="border-radius: 4px;">
</div>

<b>Vista Mobile (max-width: 600px)</b>
<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; margin-top: 10px;">
  <img src="image-6.png" alt="Mobile 1" width="23%" style="border-radius: 4px;">
  <img src="image-7.png" alt="Mobile 2" width="23%" style="border-radius: 4px;">
  <img src="image-9.png" alt="Mobile 3" width="23%" style="border-radius: 4px;">
  <img src="image-2.png" alt="Mobile Inicios" width="23%" style="border-radius: 4px;">
</div>

<br>
<div align="center" style="color: #b3b3b3; font-size: 12px; margin-top: 40px; border-top: 1px solid #282828; padding-top: 20px;">
</div>