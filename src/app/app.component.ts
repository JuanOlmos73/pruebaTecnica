import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'castoresPruebaTecnica';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.getRole()) { // ✅ Nombre correcto del método
      this.verifyTokenValidity();
    }
  }

  private verifyTokenValidity(): void {
    this.authService.validateToken().pipe(
      catchError(() => {
        this.handleInvalidToken();
        return of(false);
      })
    ).subscribe();
  }

  private handleInvalidToken(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}