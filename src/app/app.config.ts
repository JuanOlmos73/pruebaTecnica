import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter }     from '@angular/router';
import { providePrimeNG }    from 'primeng/config';
import { routes }            from './app.routes';
import { provideHttpClient, withInterceptors  } from '@angular/common/http';
import { MessageService }    from 'primeng/api';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), 
     provideAnimations(),
     provideHttpClient(withInterceptors([authInterceptor])),
    providePrimeNG({ 
/*    theme: {
        preset: 'vela-blue' // o cualquier otro nombre de tema soportado
      }  */
    }),
    MessageService,
  ]
};


