/* 
NOMBRE: RegistrarEventoPage
DESCRIPCIÓN: Componente para registrar eventos, incluyendo captura de imágenes y videos.
DESARROLLADOR: Luis Mujica
FECHA: 2025-05-31
PROYECTO: BooApp
VERSION: 1.0.0  
*/

/* IMPORTANTE: Este componente utiliza Capacitor para acceder a la cámara y al sistema de archivos.*/
/* Asegúrate de tener instalados los plugins necesarios y configurados correctamente en tu proyecto.*/
/* IMPORTANTE: Este componente también utiliza Ionic para mostrar alertas y manejar formularios reactivos.*/
/* IMPORTANTE: Asegúrate de tener instalados los módulos de Ionic y Angular Forms en tu proyecto.*/
/* IMPORTANTE: Este componente utiliza DomSanitizer para manejar URLs seguras de videos.*/
/* IMPORTANTE: Asegúrate de importar DomSanitizer desde @angular/platform-browser.*/
/* IMPORTANTE: Este componente maneja la eliminación de imágenes y videos con confirmación.*/

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-registrar-evento',
  templateUrl: './registrar-evento.page.html',
  styleUrls: ['./registrar-evento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegistrarEventoPage implements OnDestroy {
  registroForm: FormGroup;
  fechaActual: string = new Date().toISOString();
  imagenPrevia: string | undefined;
  videoPrevia: SafeUrl | undefined;
  esVideo: boolean = false;
  nombreArchivo: string = '';

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private sanitizer: DomSanitizer
  ) {
    this.registroForm = this.fb.group({
      idCodEvento: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      latitud: [''],
      longitud: [''],
      fechaCreacion: [this.fechaActual, Validators.required],
      imagen: [''],
      video: [''],
      comentario: [''],
      popularidad: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      estado: ['Activo', Validators.required],
      fechaVisual: [''],
      comentarioRev: [''],
      tipoContenido: ['', Validators.required],
      idUsuario: ['', Validators.required],
    });
  }

  /* Método para mostrar una alerta con un mensaje personalizado. */
  /* Este método se utiliza para mostrar mensajes de éxito o error al usuario. */
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  /* Método para tomar una foto utilizando la cámara del dispositivo. */
  /* Este método utiliza el plugin Camera de Capacitor para capturar una imagen. */
  async tomarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });

      this.imagenPrevia = imagen.dataUrl;
      this.registroForm.patchValue({
        imagen: {
          dataUrl: imagen.dataUrl,
          name: `imagen_${Date.now()}.jpg`, // Asignar nombre único
        },
      });
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.mostrarAlerta('Error', 'No se pudo capturar la imagen');
    }
  }

  /* Método para eliminar la imagen seleccionada. */
  /* Este método muestra una alerta de confirmación antes de eliminar la imagen. */
  async eliminarImagen() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar la imagen seleccionada?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.imagenPrevia = undefined;
            this.registroForm.patchValue({ imagen: '' });
            this.mostrarAlerta('Éxito', 'Imagen eliminada correctamente');
          },
        },
      ],
    });

    await alert.present();
  }

  /* Método para seleccionar un video desde el dispositivo. */
  /* Este método utiliza el plugin FilePicker de Capacitor para seleccionar un video. */
  async seleccionarVideo() {
    try {
      const result = await FilePicker.pickFiles({
        types: ['video/*'],
        // multiple: false,
        readData: true,
      });

      if (result.files && result.files.length > 0) {
        const selectedFile = result.files[0];
        this.nombreArchivo = selectedFile.name;
        this.esVideo = selectedFile.mimeType?.startsWith('video/') || false;

        if (this.esVideo && selectedFile.data) {
          // Convertir los datos base64 a ArrayBuffer
          const byteCharacters = atob(selectedFile.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);

          // Crear Blob y URL
          const blob = new Blob([byteArray], {
            type: selectedFile.mimeType,
          });
          const videoUrl = URL.createObjectURL(blob);
          this.videoPrevia = this.sanitizer.bypassSecurityTrustUrl(videoUrl);
        }

        // Guardar la información del archivo
        this.registroForm.patchValue({
          video: {
            path: selectedFile.path,
            name: selectedFile.name,
            size: selectedFile.size,
            mimeType: selectedFile.mimeType,
            esVideo: this.esVideo,
            data: selectedFile.data,
          },
        });
      }
    } catch (error) {
      console.error('Error al seleccionar video:', error);
      if ((error as any).message !== 'User canceled.') {
        await this.mostrarAlerta('Error', 'No se pudo seleccionar el video');
      }
    }
  }

  /* Método para eliminar el video seleccionado. */
  /* Este método muestra una alerta de confirmación antes de eliminar el video. */
  async eliminarVideo() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar el video seleccionado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            if (this.videoPrevia) {
              URL.revokeObjectURL(this.videoPrevia.toString());
            }
            this.videoPrevia = undefined;
            this.esVideo = false;
            this.nombreArchivo = '';
            this.registroForm.patchValue({ video: '' });
            this.mostrarAlerta('Éxito', 'Video eliminado correctamente');
          },
        },
      ],
    });

    await alert.present();
  }

  /* Método para limpiar la imagen previa. */
  ngOnDestroy() {
    // Limpiar las URLs creadas para evitar fugas de memoria
    if (this.videoPrevia) {
      URL.revokeObjectURL(this.videoPrevia.toString());
    }
  }

  /* Método para manejar el envío del formulario. */
  /* Este método valida el formulario y muestra los datos en consola. */
  /* Si el formulario es válido, se crea un objeto JSON con los datos. */
  async onSubmit() {
    if (this.registroForm.valid) {
      try {
        // Obtener todos los valores del formulario
        const formData = this.registroForm.value;

        // Crear objeto JSON con los datos
        const jsonData = {
          ...formData,
          // Asegurar que los campos de archivos sean strings
          // Obtener nombre de la imagen (si existe)
          imagen: this.imagenPrevia ? `imagen_${Date.now()}.jpg` : null,
          // Obtener nombre del video (si existe)
          video: formData.video?.name ? formData.video.name : null,
        };

        // Mostrar en consola el JSON formateado
        console.log('Datos del formulario:', JSON.stringify(jsonData, null, 2));

        await this.mostrarAlerta(
          'Éxito',
          'Datos del formulario mostrados en consola'
        );
      } catch (error) {
        console.error('Error al procesar formulario:', error);
        await this.mostrarAlerta(
          'Error',
          'Hubo un problema al procesar los datos'
        );
      }
    } else {
      // Mostrar errores de validación en consola
      console.log('Errores en el formulario:', this.registroForm.errors);
      console.log('Estado de los campos:');
      Object.keys(this.registroForm.controls).forEach((key) => {
        const control = this.registroForm.get(key);
        if (control?.invalid) {
          console.log(`Campo ${key}:`, control.errors);
        }
      });

      await this.mostrarAlerta(
        'Error',
        'Por favor complete todos los campos requeridos'
      );
    }
  }
}
