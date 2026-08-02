# Analytics Data Workflow

## Proposito

Usar datos agregados de Google Analytics para mejorar el sitio y planear entradas
del blog sin publicar credenciales, identificadores operativos ni datos
personales.

## Credenciales Locales

La cuenta de servicio debe vivir en:

```text
.secrets/google-analytics-service-account.json
```

`.secrets/` esta ignorado por Git y no debe agregarse al repositorio. No pegar el
contenido del JSON en issues, commits, comentarios, documentacion publica ni
mensajes de PR.

## Configuracion Requerida en Google

1. Habilitar en el proyecto de Google Cloud de la cuenta de servicio:
   - Google Analytics Admin API.
   - Google Analytics Data API.
2. En Google Analytics, agregar el `client_email` de la cuenta de servicio como
   usuario de la propiedad GA4.
3. Dar permiso minimo de lectura, por ejemplo Viewer.
4. Definir el ID de propiedad localmente:

```sh
export GA4_PROPERTY_ID=123456789
```

El ID real de propiedad no debe registrarse en archivos rastreados por Git.

## Comandos

```sh
npm run analytics:auth
npm run analytics:properties
GA4_PROPERTY_ID=123456789 npm run analytics:pages -- --days=90
GA4_PROPERTY_ID=123456789 npm run analytics:traffic -- --days=90
GA4_PROPERTY_ID=123456789 npm run analytics:blog -- --days=90 --limit=10
```

## Uso Editorial

Los reportes deben usarse para inferencias agregadas:

- paginas con mas lectura;
- fuentes de trafico;
- posts con mejor engagement;
- oportunidades de navegacion interna;
- temas para nuevas entradas;
- idioma o formato prioritario.

No publicar capturas, exports crudos, identificadores de propiedad, datos de
usuarios, ubicaciones detalladas ni conclusiones que permitan identificar a
personas concretas.
