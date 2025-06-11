import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  // IonCard,
  // IonCardHeader,
  // IonCardTitle,
  // IonCardSubtitle,
  // IonCardContent,
  IonButton,
  IonSpinner,
  IonButtons,
  IonBackButton,
  IonItem, // <-- AGREGA ESTO
  IonAvatar, // <-- Y ESTO
  IonLabel, // <-- Y ESTO
} from '@ionic/angular/standalone';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ApiBooappService } from '../../services/api-booapp.service';

@Component({
  selector: 'app-list-crud-logicaldelete',
  templateUrl: './list-crud-logicaldelete.page.html',
  styleUrls: ['./list-crud-logicaldelete.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    // IonCard,
    // IonCardHeader,
    // IonCardTitle,
    // IonCardSubtitle,
    // IonCardContent,
    IonButton,
    IonSpinner,
    IonButtons,
    IonBackButton,
    NgIf,
    NgFor,
    IonItem, // <-- AGREGA ESTO
    IonAvatar, // <-- Y ESTO
    IonLabel, // <-- Y ESTO
  ],
})
export class ListCrudLogicaldeletePage implements OnInit {
  data: any[] = [];
  cargando: boolean = true;

  constructor(
    private apiService: ApiBooappService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.llenarDatos();
  }
  ionViewWillEnter() {
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
  editarEvento(item: any) {
    this.router.navigate(['patch-evento'], {
      queryParams: {
        _id: item._id,
        idCodEvento: item.idCodEvento,
        titulo: item.titulo,
        descripcion: item.descripcion,
        ubicacion: item.ubicacion,
        latitud: item.latitud,
        longitud: item.longitud,
        fechaCreacion: item.fechaCreacion,
        imagen: item.imagen,
        video: item.video,
        comentario: item.comentario,
        popularidad: item.popularidad,
        estado: item.estado,
        fechaVisual: item.fechaVisual,
        comentarioRev: item.comentarioRev,
        tipoContenido: item.tipoContenido,
        idUsuario: item.idUsuario,
      },
    });
  }
}
