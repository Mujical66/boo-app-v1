/* 
NOMBRE: api-booapp.service.ts
DESCRIPCION: Servicio para manejar las peticiones a la API de BooApp.
DESARROLLADOR: Luis Mujica
FECHA: 2025-06-03
PROYECTO: BooApp
VERSION: 1.0.0  
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiBooappService {
  private urlApi = 'https://booapp-api.onrender.com/v1/backend-api-booapp-aws';

  constructor(private http: HttpClient) {}

  // ==================== EVENTOS PARANORMALES ====================
  /**
   * Obtiene la lista de eventos paranormales desde la API.
   * @returns Observable con los datos de los eventos.
   */
  public getData(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/colevento`);
  }

  /**
   * Elimina un evento por su ID.
   * @param id - ID del evento a eliminar.
   * @returns Observable con la respuesta de la eliminación.
   */
  public eliminarEvento(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/colevento/${id}`);
  }
}
