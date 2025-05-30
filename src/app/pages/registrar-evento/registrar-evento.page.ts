import { Component } from '@angular/core';
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

@Component({
  selector: 'app-registrar-evento',
  templateUrl: './registrar-evento.page.html',
  styleUrls: ['./registrar-evento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegistrarEventoPage {
  registroForm: FormGroup;
  fechaActual: string = new Date().toISOString();
  imagenPrevia: string | undefined;
  videoPrevia: string | undefined;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController
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

  async seleccionarVideo() {
    // Implementar lógica para seleccionar video
    this.mostrarAlerta('Información', 'Funcionalidad de video en desarrollo');
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
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
