---
layout: document
title: Documentation
---

# Formatos de archivo

Hay muchos formatos de archivo disponibles para el desarrollador y el artista del juego. Esta reescritura del lanzamiento inicial de GameDevUtils.com no incluye soporte para más formatos de imagen o datos. Estos se incluirán en una versión futura. El objetivo de la versión actual es tener una paridad de funciones de 1 a 1 entre la versión inicial (v0.2.0) y la reescritura de la misma (v0.3.0).

Si tiene un formato de archivo en particular que le gustaría ver compatible, [abra un problema](https://github.com/GameDevUtils/gdu-sheets/issues/new?title=Feature%20Request%20(File%20Formats)&body=Yo%20me%20gustaría%20a%20ver%20apoyar%20para%20los%20siguientes%20archivos%20formato(s):) en GitHub.

### Formato de imagen

Los siguientes formatos de imagen son compatibles con este módulo:

- GIF
- JPG
- PNG (predeterminado)

GameDevUtils.com comenzó como una aplicación solo web, por lo que solo usaba formatos de imagen compatibles con la web. Un próximo lanzamiento incluirá soporte para más formatos de imagen. Cuando corresponda, este módulo también admitirá la configuración de la calidad de imagen en las imágenes generadas.

### Formato de datos

Los siguientes formatos de datos son compatibles con este módulo:

- CSS
- JSON
- XML (predeterminado)

Un próximo lanzamiento incluirá soporte para formatos de datos específicos del motor de juego.

### Archivos de proyecto (Acción de guardar)

Hay dos variantes del formato de archivo de proyecto:

- FPSHETS (predeterminado)<br/>
  Archivo de proyecto como JSON.
- FPSHEETZ<br/>
  Archivo de proyecto como JSON, comprimido.

Los archivos de proyecto contienen todos los datos de configuración del proyecto, así como las imágenes de origen codificadas en base64.

### Archivo de salida (Acción de publicación)

Cuando se publica el proyecto, el resultado es un archivo ZIP que contiene el archivo de imagen (con los sprites) y el archivo de datos (con las ubicaciones y tamaños de los sprites).

Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba. Esto es una prueba.

<div class="row docs-nav">
<div class="col-2"></div>
<div class="col-4"><button type="button" onclick='javascript:goto(this, "03-project-settings.html");' class="btn btn-primary">&laquo; Anterior</button></div>
<div class="col-4"><button type="button" onclick='javascript:goto();' class="btn btn-primary disabled">Próximo &raquo;</button></div>
<div class="col-2"></div>
</div>
