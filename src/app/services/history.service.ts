import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ProductoHistoricoView {
  tipomovimiento: string;
  nombreproducto: string;
  cantidad:       number;
  fecha:          Date;
  usuario:        string;
  detalle :       string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  // Endpoints de inventario (dmls)
  private baseUrl = 'http://localhost:8080/api/dmls';

  constructor(private http: HttpClient) {}

  /** Llama a Pkginventario.obtenerProductos() */
  obtenerHistorico(): Observable<ProductoHistoricoView[]> {
    // GET http://localhost:8080/api/dmls/obtenerProductos
    return this.http.get<ProductoHistoricoView[]>(`${this.baseUrl}/obtenerHistorico`);
  }
}
