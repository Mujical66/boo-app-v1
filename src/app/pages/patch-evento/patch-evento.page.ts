/* 
NOMBRE: patch-evento.page.ts
DESCRIPCION: Página de la logica para editar un evento.
DESARROLLADOR: Luis Mujica
FECHA: 2025-06-03
PROYECTO: BooApp
VERSION: 1.0.0  
*/
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput, // <-- Agrega este import
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonTextarea,
  AlertController,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonSpinner,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-patch-evento',
  templateUrl: './patch-evento.page.html',
  styleUrls: ['./patch-evento.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonLabel,
    IonInput, // <-- Agrega este import aquí también
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    ReactiveFormsModule, // <-- AGREGA ESTA LÍNEA
    IonImg, // <-- Agrega este import para mostrar imágenes
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonNote, // <-- Agrega este import para notas
    IonSpinner,
  ],
})
export class PatchEventoPage implements OnInit {
  patchForm!: FormGroup;
  fechaCreacionFormateada: string = '';

  // Agrega estas propiedades aquí
  imagenPrevia?: string;
  imagenAlmacenada?: string;
  videoPrevia?: string;
  videoAlmacenado?: string;
  nombreArchivo: string = '';
  esVideo: boolean = false;
  videoKey: number = Date.now();
  originalFormValue: any;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private alertController: AlertController,
    private http: HttpClient,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.patchForm = this.fb.group({
      _id: ['', Validators.required],
      idCodEvento: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      latitud: [''],
      longitud: [''],
      fechaCreacion: ['', Validators.required],
      imagen: [''],
      video: [''],
      comentario: [''],
      popularidad: [0, [Validators.required, Validators.pattern(/^[0-5]+$/)]],
      estado: ['Activo', Validators.required],
      fechaVisual: [''],
      comentarioRev: [''],
      tipoContenido: ['', Validators.required],
      idUsuario: ['', Validators.required],

      // Agrega aquí más campos si lo necesitas
    });

    this.route.queryParams.subscribe((params) => {
      this.patchForm.patchValue({
        _id: params['_id'] || '',
        idCodEvento: params['idCodEvento'] || '',
        titulo: params['titulo'] || '',
        descripcion: params['descripcion'] || '',
        ubicacion: params['ubicacion'] || '',
        latitud: params['latitud'] || '',
        longitud: params['longitud'] || '',
        fechaCreacion: params['fechaCreacion'] || new Date().toISOString(),
        imagen: params['imagen'] || '',
        video: params['video'] || '',
        comentario: params['comentario'] || '',
        popularidad: params['popularidad'] || 0,
        estado: params['estado'] || 'Activo',
        fechaVisual: params['fechaVisual'] || '',
        comentarioRev: params['comentarioRev'] || '',
        tipoContenido: params['tipoContenido'] || '',
        idUsuario: params['idUsuario'] || '',
        // Agrega aquí más campos si los pasas por queryParams
      });
      // Si hay imagen almacenada, arma la URL (ajusta la ruta según tu backend)
      if (params['imagen']) {
        this.imagenAlmacenada =
          'https://s3-uploadimages-booapp-bucket.s3.us-east-2.amazonaws.com/' +
          params['imagen'];
      }
      // Si hay video almacenado, arma la URL (ajusta la ruta según tu backend)
      if (params['video']) {
        this.videoAlmacenado =
          'https://s3-uploadimages-booapp-bucket.s3.us-east-2.amazonaws.com/' +
          params['video'];
      }
      this.route.queryParams.subscribe((params) => {
        // Formatea la fecha si existe
        if (params['fechaCreacion']) {
          const fecha = new Date(params['fechaCreacion']);
          const dia = String(fecha.getDate()).padStart(2, '0');
          const mes = String(fecha.getMonth() + 1).padStart(2, '0');
          const anio = fecha.getFullYear();
          this.fechaCreacionFormateada = `${dia}/${mes}/${anio}`;
          this.patchForm.patchValue({ fechaCreacion: params['fechaCreacion'] });
        }
        // ...otros campos...
      });
    });
  }

  // Método para actualizar el evento
  async onUpdate() {
    if (this.patchForm.valid) {
      const titulo = this.patchForm.value.titulo?.trim();
      if (!titulo) {
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message: 'El campo Título no puede estar vacío.',
          buttons: ['OK'],
        });
        await errorAlert.present();
        return;
      }
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Seguro de Actualizar los Datos?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Sí',
            handler: async () => {
              const loading = await this.loadingController.create({
                message: 'Actualizando...',
                spinner: 'bubbles',
                backdropDismiss: false,
              });
              await loading.present();

              const id = this.patchForm.value._id;
              if (!id || id.length !== 24) {
                this.alertController
                  .create({
                    header: 'Error',
                    message: 'El identificador del evento no es válido.',
                    buttons: ['OK'],
                  })
                  .then((alert) => alert.present());
                return;
              }
              const url = `https://booapp-api.onrender.com/v1/backend-api-booapp-aws/colevento/${id}`;
              const { _id, ...fields } = this.patchForm.value;

              // Detecta si hay archivos
              const hasImageFile = fields.imagen instanceof File;
              const hasVideoFile = fields.video instanceof File;

              let body: any;
              let options: any = {};

              if (hasImageFile || hasVideoFile) {
                console.log('Archivo video:', fields.video);
                body = new FormData();
                for (const key in fields) {
                  if (
                    fields[key] !== undefined &&
                    fields[key] !== null &&
                    fields[key] !== ''
                  ) {
                    body.append(key, fields[key]);
                  }
                }
                // No agregues headers, Angular los gestiona para FormData
              } else {
                body = fields;
                options = { headers: { 'Content-Type': 'application/json' } };
              }

              this.http.patch(url, body, options).subscribe({
                next: async (response) => {
                  await loading.dismiss(); // Aquí se oculta el modal de "Actualizando..."
                  const successAlert = await this.alertController.create({
                    header: 'Éxito',
                    message: 'El evento fue actualizado correctamente.',
                    buttons: ['OK'],
                  });
                  await successAlert.present();
                },
                error: async (error) => {
                  const errorAlert = await this.alertController.create({
                    header: 'Error',
                    message:
                      'Ocurrió un error al actualizar el evento. Intenta nuevamente.',
                    buttons: ['OK'],
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

  // Método cancelar para volver a la página anterior:
  cancelar() {
    this.location.back();
  }

  // Agrega aquí los métodos recomendados
  tomarFoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.nombreArchivo = file.name;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagenPrevia = e.target.result;
          this.patchForm.patchValue({ imagen: file });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  // Método para eliminar la imagen
  eliminarImagen() {
    this.imagenPrevia = undefined;
    this.patchForm.patchValue({ imagen: '' });
    this.nombreArchivo = '';
  }

  // Método para seleccionar el video
  seleccionarVideo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*,application/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        // Libera la URL anterior si existe
        if (this.videoPrevia) {
          URL.revokeObjectURL(this.videoPrevia);
        }
        this.nombreArchivo = file.name;
        this.esVideo = file.type.startsWith('video/');
        this.videoAlmacenado = undefined; // Oculta el video almacenado
        this.videoPrevia = URL.createObjectURL(file);
        this.videoKey = Date.now(); // <-- NUEVO: clave única para forzar recarga
        this.patchForm.patchValue({ video: file });
      }
    };
    input.click();
  }

  // Método para eliminar el video
  eliminarVideo() {
    if (this.videoPrevia) {
      URL.revokeObjectURL(this.videoPrevia);
    }
    this.videoPrevia = undefined;
    this.esVideo = false;
    this.nombreArchivo = '';
    this.patchForm.patchValue({ video: '' });
  }

  // Método para actualizar la vista previa del video
  actualizarVistaPreviaVideo() {
    this.videoKey = Date.now(); // Cambia la clave para forzar recarga del <video>
  }
}

/*
export class PatchEventoPage implements OnInit {
  titulo: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.titulo = params['titulo'] || '';
    });
  }
}*/
