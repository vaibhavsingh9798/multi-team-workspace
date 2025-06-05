// types/env.d.ts or global.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
  }
}

declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';

  interface SwaggerUiOptions {
    customCss?: string;
    customfavIcon?: string;
    customJs?: string;
    customSiteTitle?: string;
    explorer?: boolean;
    swaggerOptions?: Record<string, any>;
  }

  export const serve: RequestHandler;
  export function setup(swaggerDoc: object, options?: SwaggerUiOptions): RequestHandler;
}
