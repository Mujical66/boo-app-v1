/* 
NOMBRE: menu-conexion.page.ts
DESCRIPCION: Página de la logica para el menu de conexión.
DESARROLLADOR: Luis Mujica
FECHA: 2025-06-03
PROYECTO: BooApp
VERSION: 1.0.0  
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu-conexion',
  templateUrl: './menu-conexion.page.html',
  styleUrls: ['./menu-conexion.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class MenuConexionPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
