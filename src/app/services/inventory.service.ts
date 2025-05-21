// src/app/services/inventory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Importa el modelo de ProductoInventarioView
export interface ProductoInventarioView {
  idproducto: number;
  nombreproducto: string;
  cantidad: number;
  precio: number;
  estatus: boolean;
  total : number;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  // Endpoints de inventario (dmls)
  private baseUrl = 'http://localhost:8080/api/dmls';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<ProductoInventarioView[]> {
  return this.http.get<ProductoInventarioView[]>(`${this.baseUrl}/obtenerProductos`);
}
}
