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
  IonCardContent,
  IonButton,
  IonSpinner,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
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
    IonCardContent,
    IonButton,
    IonSpinner,
    IonButtons,
    IonBackButton,
    NgIf,
    NgFor,
  ],
})
export class ListCrudEventoPage implements OnInit {
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

  async eliminarEvento(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Está seguro de eliminar este registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            this.apiService.eliminarEvento(item._id || item.id).subscribe({
              next: async () => {
                this.llenarDatos();
                const successAlert = await this.alertCtrl.create({
                  header: 'Eliminado',
                  message: 'Registro eliminado con éxito',
                  buttons: [
                    {
                      text: 'Continuar',
                      role: 'confirm',
                    },
                  ],
                });
                await successAlert.present();
              },
              error: async () => {
                const errorAlert = await this.alertCtrl.create({
                  header: 'Error',
                  message: 'Error al eliminar el registro',
                  buttons: [
                    {
                      text: 'Continuar',
                      role: 'confirm',
                    },
                  ],
                });
                await errorAlert.present();
              },
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async eliminarLogico(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message:
        '¿Está seguro de eliminar lógicamente este registro. Posteriormente lo puede Restaurar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            this.apiService.eliminarEvento(item._id || item.id).subscribe({
              next: async () => {
                this.llenarDatos();
                const successAlert = await this.alertCtrl.create({
                  header: 'Eliminado',
                  message: 'Registro eliminado con éxito',
                  buttons: [
                    {
                      text: 'Continuar',
                      role: 'confirm',
                    },
                  ],
                });
                await successAlert.present();
              },
              error: async () => {
                const errorAlert = await this.alertCtrl.create({
                  header: 'Error',
                  message: 'Error al eliminar el registro',
                  buttons: [
                    {
                      text: 'Continuar',
                      role: 'confirm',
                    },
                  ],
                });
                await errorAlert.present();
              },
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
