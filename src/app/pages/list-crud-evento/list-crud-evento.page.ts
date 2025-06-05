/* 
NOMBRE: ListCrudEventoPage.ts
DESCRIPCION: Página de la logica para listar y gestionar el CRUD (Delete - Patch) de eventos.
DESARROLLADOR: Luis Mujica
FECHA: 2025-06-03
PROYECTO: BooApp
VERSION: 1.0.0  
*/
import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  // IonCardContent,
  // IonCardContent,
  // IonItem,
  IonSpinner,
} from '@ionic/angular/standalone';
import { NgIf, NgFor } from '@angular/common';
import { ApiBooappService } from '../../services/api-booapp.service';

@Component({
  selector: 'app-list-crud-evento',
  templateUrl: 'list-crud-evento.page.html',
  styleUrls: ['list-crud-evento.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    // IonCardContent,
    // IonCardContent,
    // IonItem,
    IonSpinner,
    NgIf,
    NgFor,
  ],
})
export class ListCrudEventoPage implements OnInit {
  data: any[] = [];
  cargando: boolean = true;

  constructor(private apiService: ApiBooappService) {}

  ngOnInit(): void {
    this.llenarDatos();
  }

  llenarDatos() {
    this.cargando = true;
    this.apiService.getData().subscribe({
      next: (response) => {
        this.data = response.data?.colEventosleps || [];
        this.cargando = false;
        console.log('Datos obtenidos:', this.data);
      },
      error: (error) => {
        this.cargando = false;
        console.error('Error al obtener los datos:', error);
      },
    });
  }
}
