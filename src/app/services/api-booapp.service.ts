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

  public getData(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/colevento`);
  }
}
