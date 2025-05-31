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

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async tomarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });

      this.imagenPrevia = imagen.dataUrl;
      this.registroForm.patchValue({ imagen: imagen.dataUrl });
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.mostrarAlerta('Error', 'No se pudo capturar la imagen');
    }
  }

  // Agrega este método junto a los demás
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

  ngOnDestroy() {
    // Limpiar las URLs creadas para evitar fugas de memoria
    if (this.videoPrevia) {
      URL.revokeObjectURL(this.videoPrevia.toString());
    }
  }

  async onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario válido:', this.registroForm.value);
      await this.mostrarAlerta('Éxito', 'Contenido registrado exitosamente');
      // Aquí iría la lógica para enviar a la API
    } else {
      await this.mostrarAlerta(
        'Error',
        'Por favor complete todos los campos requeridos'
      );
    }
  }
}
