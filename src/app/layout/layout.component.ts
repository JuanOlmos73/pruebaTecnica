import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  rol: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol');
    console.log('this.rol', this.rol)
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
