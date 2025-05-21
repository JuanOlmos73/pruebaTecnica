import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private loginUrl = 'http://localhost:8080/api/auth/login';
  private logoutUrl = 'http://localhost:8080/api/auth/logout';
  private validateUrl = 'http://localhost:8080/api/auth/validate-token';

  constructor(private http: HttpClient) {}

 login(correo: string, contrasena: string): Observable<LoginResponse> {
  console.log('correo', correo, 'contrasena', contrasena);
  return this.http.post<LoginResponse>(this.loginUrl, { correo, contrasena }).pipe(
    tap(response => {
      this.setToken(response.token); // Guarda el token automáticamente
      const role = this.getRole();
      if (role) {
        localStorage.setItem('rol', role); // Guarda el rol con clave 'rol'
      }
    })
  );
}


  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode(token);
  }

  getRole(): string | null {
    const decoded = this.decodeToken();
    if (!decoded) return null;
    return decoded.role[0]?.authority.replace('ROLE_', '') || null;
  }

  getUsername(): string | null {
    const decoded = this.decodeToken();
    return decoded?.sub || null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.logoutUrl, {}).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem('role');
        localStorage.removeItem('username');
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = this.getToken();
    return this.http.get<boolean>(this.validateUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getUserInfo(): { username: string | null; role: string | null } {
    return {
      username: this.getUsername(),
      role: this.getRole()
    };
  }
}
