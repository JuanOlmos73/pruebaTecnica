import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (!this.authService.isLoggedIn()) {
      console.log('No hay token, redirigiendo a login');
      return of(this.router.parseUrl('/login'));
    }

    return this.authService.validateToken().pipe(
       tap(isValid => console.log('validateToken result:', isValid)),
      map(isValid => isValid ? true : this.router.parseUrl('/login')),
      catchError(err => {
         console.error('Error validando token:', err);
        this.authService.logout().subscribe();
        return of(this.router.parseUrl('/login'));
      })
    );
  }
}
