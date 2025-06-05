/* 
NOMBRE: undelete-evento.page.ts
DESCRIPCION: Página de la logica para restaurar un evento eliminado.
DESARROLLADOR: Luis Mujica
FECHA: 2025-06-03
PROYECTO: BooApp
VERSION: 1.0.0  
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-undelete-evento',
  templateUrl: './undelete-evento.page.html',
  styleUrls: ['./undelete-evento.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class UndeleteEventoPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
