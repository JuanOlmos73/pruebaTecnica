import { Component } from '@angular/core';
import { InventoryService, ProductoInventarioView } from '../services/inventory.service';
import { FormsModule } from '@angular/forms';
import {
  CurrencyPipe,
  LowerCasePipe,
  NgFor,
  NgIf,
  DecimalPipe
} from '@angular/common';
@Component({
  selector: 'app-output',
  standalone: true,
  imports: [FormsModule,CurrencyPipe,
  LowerCasePipe,
  NgFor,
  NgIf,
  DecimalPipe],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss'
})
export class OutputComponent {
  productos: ProductoInventarioView[] = [];
  loading = true;

  showNotification = false;
  notificationMessage = '';

  // Diálogo
  dialogVisible = false;
  productoSeleccionado: ProductoInventarioView | null = null;
  cantidadSalida: number = 0;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.loadProducts();
  }

  mostrarToast(mensaje: string) {
    this.notificationMessage = mensaje;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 3000);
  }

  loadProducts() {
    this.loading = true;
    this.inventoryService.obtenerProductos().subscribe({
      next: (data) => {
        // Solo activos
        this.productos = data.filter(p => p.estatus === true);
        this.loading = false;
      },
      error: () => {
        this.mostrarToast('Error al cargar productos');
        this.loading = false;
      }
    });
  }

  abrirDialogo(producto: ProductoInventarioView) {
    this.productoSeleccionado = producto;
    this.cantidadSalida = 0;
    this.dialogVisible = true;
  }

  confirmarSalida() {
    if (!this.productoSeleccionado || this.cantidadSalida <= 0) {
      this.mostrarToast('Cantidad inválida');
      return;
    }

    if (this.cantidadSalida > this.productoSeleccionado.cantidad) {
      this.mostrarToast('No hay suficiente inventario');
      return;
    }

    // Restar del producto
    this.productoSeleccionado.cantidad -= this.cantidadSalida;
    this.dialogVisible = false;
    this.mostrarToast('Salida realizada');
  }

  cancelarSalida() {
    this.dialogVisible = false;
  }
}
