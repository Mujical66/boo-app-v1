/* 
NOMBRE: delete-evento.page.ts
DESCRIPCION: Página de la logica para eliminar un evento.
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
  selector: 'app-delete-evento',
  templateUrl: './delete-evento.page.html',
  styleUrls: ['./delete-evento.page.scss'],
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
export class DeleteEventoPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
