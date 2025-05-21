import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
 
onSubmit() {
  
  this.authService.login(this.correo, this.contrasena).subscribe({
    next: (response: LoginResponse) => {
      const rol = this.authService.getRole(); // método que devuelve el rol guardado (ej. 'admin' o 'almacenista')

      setTimeout(() => {
        if (rol === 'ADMIN') {
          this.router.navigate(['/inventario']);
        } else {
          this.router.navigate(['/salida']);
        }
      }, 200);
    },
    error: (error: any) => {
      console.error('Error al iniciar sesión', error);
    }
  });
}
}
