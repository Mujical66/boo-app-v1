import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; // Para leer el parámetro de la ruta

@Component({
  selector: 'app-myth-detail',
  templateUrl: './myth-detail.page.html',
  styleUrls: ['./myth-detail.page.scss'],
  standalone: true, // ¡Confirmación de que es un componente standalone!
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MythDetailPage implements OnInit {
  mythId: string | null = null;
  mythDetails: any; // Aquí almacenarás los detalles del mito

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.mythId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('ID del mito recibido:', this.mythId);
    // Aquí podrías cargar los detalles del mito usando el mythId
    // Por ejemplo, desde un servicio, o un array de datos
    this.loadMythDetails(this.mythId);
  }

  loadMythDetails(id: string | null) {
    // Ejemplo de cómo cargarías los detalles de un mito
    // En una aplicación real, esto vendría de un servicio o una base de datos
    const allMyths = [
      {
        id: 'imagen1',
        name: 'Fantasma Bebe',
        fullStory: 'Fantasma bebé muy juguetón y divertido.',
      },
      {
        id: 'imagen2',
        name: 'Casa Fantasmal',
        fullStory: 'Casa del terror ubicada en la ciudad de Caracas.',
      },
      {
        id: 'imagen3',
        name: 'Fantasma Prohibido',
        fullStory:
          'Criatura majestuosa con cuerpo de un fantasma que no puede ingresar a un sitio.',
      },
      {
        id: 'imagen4',
        name: 'Grupo de Fantasmas',
        fullStory: 'Grupo de fantasmas saliendo de su casa.',
      },
      {
        id: 'imagen5',
        name: 'Calabera Fantasmal',
        fullStory: 'Calabera de fantasma muy asustada.',
      },

      // ... más mitos
    ];
    this.mythDetails = allMyths.find((myth) => myth.id === id);
    if (!this.mythDetails) {
      this.mythDetails = {
        name: 'Mito No Encontrado',
        fullStory:
          'Lo sentimos, no pudimos encontrar los detalles para este mito.',
      };
    }
  }
}
