# Guía de Compatibilidad con Cloudflare para eMotionTrack

## Introducción

Este documento explica cómo se ha adaptado el proyecto eMotionTrack para ser completamente compatible con la infraestructura de Cloudflare, tanto en el frontend como en el backend y el componente de IA.

## Arquitectura Compatible con Cloudflare

La arquitectura del proyecto ha sido modificada para aprovechar los servicios de Cloudflare:

1. **Frontend**: Implementado con Next.js y desplegado en Cloudflare Pages
2. **Backend**: Implementado como Cloudflare Workers con itty-router
3. **Base de datos**: Preparado para utilizar Cloudflare D1 (base de datos SQL)
4. **Componente de IA**: Implementado como Cloudflare Workers

## Configuración del Frontend (Cloudflare Pages)

El frontend utiliza Next.js con configuraciones específicas para Cloudflare Pages:

- **next.config.js**: Configurado con opciones específicas para Cloudflare Pages
  - `images.unoptimized: true` - Necesario para la compatibilidad con Cloudflare Pages
  - `experimental.esmExternals: true` - Para compatibilidad con módulos ESM

- **wrangler.toml**: Configuración para el despliegue en Cloudflare Pages
  - Define variables de entorno para producción y desarrollo
  - Configura el comando de construcción y el directorio de publicación

- **package.json**: Actualizado con dependencias y scripts para Cloudflare Pages
  - Incluye wrangler como dependencia de desarrollo
  - Añade script de despliegue: `deploy: "wrangler pages deploy .next"`

## Configuración del Backend (Cloudflare Workers)

El backend ha sido migrado a Cloudflare Workers:

- **wrangler.toml**: Configuración para el despliegue del Worker
  - Define la integración con Cloudflare D1 para la base de datos
  - Configura variables de entorno y rutas

- **Enrutamiento**: Implementado con itty-router
  - Manejo de rutas para todas las funcionalidades (bienestar, gamificación, flexibilidad, reportes)
  - Configuración de CORS para permitir solicitudes desde el frontend

- **Almacenamiento**: Preparado para utilizar Cloudflare D1
  - Las operaciones de base de datos están comentadas con indicaciones para la implementación real

## Configuración del Componente de IA (Cloudflare Workers)

El componente de IA también se ha implementado como Cloudflare Workers:

- **wrangler.toml**: Configuración específica para el Worker de IA
  - Puerto diferente para desarrollo local (8788)
  - Patrón de ruta específico: `/api/ia/*`

- **Funcionalidades**: Implementadas como funciones en el Worker
  - Generación de recomendaciones de bienestar
  - Análisis de tendencias
  - Generación de reportes

## Comunicación entre Componentes

Los componentes se comunican a través de API REST:

- El frontend se comunica con el backend a través de la URL definida en las variables de entorno
- El backend se comunica con el componente de IA a través de su API
- Todas las comunicaciones utilizan CORS para permitir solicitudes entre diferentes dominios

## Ventajas de la Arquitectura Cloudflare

1. **Rendimiento**: Despliegue global en la red de Cloudflare para baja latencia
2. **Escalabilidad**: Arquitectura serverless que escala automáticamente
3. **Seguridad**: Protección integrada contra ataques DDoS y otras amenazas
4. **Simplicidad**: Despliegue y gestión unificados en la plataforma Cloudflare
5. **Costo**: Modelo de precios basado en uso con generoso nivel gratuito

## Instrucciones de Despliegue

### Despliegue del Frontend (Cloudflare Pages)

1. Instalar dependencias: `cd frontend && npm install`
2. Construir el proyecto: `npm run build`
3. Desplegar en Cloudflare Pages: `npm run deploy`

### Despliegue del Backend (Cloudflare Workers)

1. Instalar dependencias: `cd backend && npm install`
2. Crear base de datos D1 (si no existe): `wrangler d1 create emotiontrack-db`
3. Actualizar el ID de la base de datos en wrangler.toml
4. Desplegar el Worker: `npm run deploy`

### Despliegue del Componente de IA (Cloudflare Workers)

1. Instalar dependencias: `cd ai && npm install`
2. Desplegar el Worker: `npm run deploy`

## Consideraciones Adicionales

- **Variables de Entorno**: Actualizar las URLs de API en el frontend después del despliegue
- **Dominio Personalizado**: Configurar un dominio personalizado en Cloudflare para los servicios
- **Monitorización**: Utilizar Cloudflare Analytics para monitorizar el rendimiento
