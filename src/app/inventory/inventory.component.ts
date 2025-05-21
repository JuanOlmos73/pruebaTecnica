import { Component, OnInit } from '@angular/core';
import { InventoryService, ProductoInventarioView } from '../services/inventory.service';
import { AuthService } from '../services/auth.service';
import {
  CurrencyPipe,
  LowerCasePipe,
  NgFor,
  NgIf,
  DecimalPipe
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [MessageService],
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    CurrencyPipe,
    DecimalPipe,
    LowerCasePipe,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    ProgressSpinnerModule
  ]
})
export class InventoryComponent implements OnInit {
  productos: ProductoInventarioView[] = [];
  loading = true;
  selectedProduct: ProductoInventarioView | null = null;
  rol: string | null = null;

  
  showAddDialog = false;
  nuevoProducto: ProductoInventarioView = {
    idproducto: 0,
    nombreproducto: '',
    precio: 0,
    cantidad: 0,
    total: 0,
    estatus: true
  };
  estatusOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ];

  showIncreaseDialog = false;
  cantidadExtra: number = 0;


  showToggleDialog = false;

  constructor(
    private inventoryService: InventoryService,
    private authService: AuthService,

  ) {}


  showNotification: boolean = false;
  notificationMessage: string = '';


  mostrarToast(mensaje: string) {
    this.notificationMessage = mensaje;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 3000); // 3 segundos visible
  }

  ngOnInit() {
    this.loadProducts();
    this.rol = this.authService.getRole();
  }

  loadProducts() {
    this.loading = true;
    this.inventoryService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (error) => {
       this.mostrarToast('Error al cargar productos');
        this.loading = false;
      }
    });
  }

  openAddDialog() {
    this.nuevoProducto = {
      idproducto: 0,
      nombreproducto: '',
      precio: 0,
      cantidad: 0,
      total: 0,
      estatus: true
    };
    this.showAddDialog = true;
  }

  openIncreaseDialog(producto: ProductoInventarioView | null) {
    if (!producto) return;
    this.selectedProduct = producto;
    this.cantidadExtra = 0;
    this.showIncreaseDialog = true;
  }

  openToggleDialog(producto: ProductoInventarioView | null) {
    if (!producto) return;
    this.selectedProduct = producto;
    this.showToggleDialog = true;
  }
  
  
  
  agregarProducto() {
  const { nombreproducto, precio, estatus, cantidad } = this.nuevoProducto;
  if (!nombreproducto || precio == null || estatus === null) {
    this.mostrarToast('Por favor complete los campos requeridos.');
    return;
  }

 
  const nuevoProd: ProductoInventarioView = {
    idproducto: this.productos.length > 0 ? this.productos[this.productos.length - 1].idproducto + 1 : 1, // id secuencial
    nombreproducto: nombreproducto,
    precio: precio,
    cantidad: cantidad || 0,
    total: (precio * (cantidad || 0)),
    estatus: estatus
  };

  this.productos.push(nuevoProd);

  this.nuevoProducto = {
    idproducto: 0,
    nombreproducto: '',
    precio: 0,
    cantidad: 0,
    total: 0,
    estatus: true
  };
  this.showAddDialog = false;

  this.mostrarToast('Producto agregado exitosamente (simulación)');
}



  aumentarInventario() {
    if (!this.cantidadExtra || this.cantidadExtra <= 0 || !this.selectedProduct) {
      this.mostrarToast('Ingrese una cantidad válida.');
      return;
    }

    this.selectedProduct.cantidad += this.cantidadExtra;
    console.log('Inventario actualizado:', this.selectedProduct);

    this.showIncreaseDialog = false;
    this.mostrarToast('Inventario aumentado correctamente (simulación)');
  }

  confirmarToggleStatus() {
    if (!this.selectedProduct) return;
    this.selectedProduct.estatus = !this.selectedProduct.estatus;

    console.log('Estatus actualizado:', this.selectedProduct);
    this.showToggleDialog = false;
    this.mostrarToast('Cambio de estatus realizado (simulación)');
  }


}
