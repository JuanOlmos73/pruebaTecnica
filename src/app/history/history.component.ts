import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule
import { HistoryService, ProductoHistoricoView } from '../services/history.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    FormsModule // ✅ Agregado aquí
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  historico: ProductoHistoricoView[] = [];
  historicoOriginal: ProductoHistoricoView[] = [];

  filtroMovimiento:  string = '';
  filtroFecha:       string = '';
  filtroUsuario:     string = '';
  loading = true;

  showNotification:    boolean = false;
  notificationMessage: string = '';
  
  tiposMovimientoDisponibles: string[] = [];
  usuariosDisponibles: string[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.loading = true;
    this.historyService.obtenerHistorico().subscribe((data: ProductoHistoricoView[]) => {
      this.historico = data;
      this.historicoOriginal = [...data];

      // Extraer tipos de movimiento únicos
      this.tiposMovimientoDisponibles = [...new Set(data.map(h => h.tipomovimiento))];

      // Extraer usuarios únicos
      this.usuariosDisponibles = [...new Set(data.map(h => h.usuario))];

      this.loading = false;
    });
  }

  aplicarFiltros() {
    if (!this.filtroMovimiento && !this.filtroFecha && !this.filtroUsuario) {
      this.historico = [...this.historicoOriginal];
      return;
    }

    this.historico = this.historicoOriginal.filter(h =>
      (!this.filtroMovimiento || h.tipomovimiento.toLowerCase().includes(this.filtroMovimiento.toLowerCase())) &&
      (!this.filtroUsuario || h.usuario.toLowerCase().includes(this.filtroUsuario.toLowerCase())) &&
      (!this.filtroFecha || new Date(h.fecha).toISOString().slice(0, 10) === this.filtroFecha)
    );

    this.mostrarToast('Filtros simulados aplicados');
  }

  limpiarFiltros() {
    this.filtroMovimiento = '';
    this.filtroFecha = '';
    this.filtroUsuario = '';
    this.historico = [...this.historicoOriginal];
    this.mostrarToast('Filtros limpiados, datos restaurados');
  }


   mostrarToast(mensaje: string) {
    this.notificationMessage = mensaje;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 3000); // 3 segundos visible
  }
 
}
