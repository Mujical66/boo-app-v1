/* 
NOMBRE: home.page.ts
DESCRIPCION: Componente principal de la página de inicio de BooApp.
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
  IonItem,
  IonSpinner,
} from '@ionic/angular/standalone';
import { NgIf, NgFor } from '@angular/common';
import { ApiBooappService } from '../services/api-booapp.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonSpinner,
    NgIf,
    NgFor,
  ],
})
export class HomePage implements OnInit {
  data: any[] = [];
  cargando: boolean = true;

  constructor(private apiService: ApiBooappService) {}

  ngOnInit(): void {
    // Initialization logic here
    this.llenarDatos();
  }

  llenarDatos() {
    this.cargando = true;
    this.apiService.getData().subscribe({
      next: (response) => {
        // Ajusta aquí para tomar el array correcto
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
