// src/app/pages/ar-view/ar-view.page.ts
import {
  Component,
  OnInit,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // Para la navegación en Angular

// ¡Importación para activar las definiciones de tipo globales de A-Frame!
// Esta línea le indica a TypeScript que considere los tipos globales definidos
// en el paquete @types/aframe (el cual debe estar instalado con npm install --save-dev @types/aframe).
import { Entity } from 'aframe';

// Definición de una interfaz para tus leyendas
interface LegendCreature {
  id: string;
  name: string;
  mythSummary: string; // Un resumen corto
  found: boolean;
}

@Component({
  selector: 'app-ar-view',
  templateUrl: './ar-view.page.html',
  styleUrls: ['./ar-view.page.scss'],
  standalone: true, // ¡Importante para componentes standalone!
  imports: [IonicModule, CommonModule], // Módulos necesarios para el template
  // CUSTOM_ELEMENTS_SCHEMA permite a Angular ignorar y no reportar errores para
  // las etiquetas HTML personalizadas de A-Frame (como <a-scene>, <a-marker>, <a-entity>).
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArViewPage implements OnInit, OnDestroy {
  availableLegends: LegendCreature[] = [
    {
      id: 'imagen1', // ¡Importante! Este ID debe coincidir con el 'data-legend-id' en tu HTML
      name: 'Fantasma Bebé',
      mythSummary: 'Fantasma bebé muy juguetón y divertido.',
      found: false,
    },
    {
      id: 'imagen2', // ¡Importante! Este ID debe coincidir con el 'data-legend-id' en tu HTML
      name: 'Casa Fantasmal',
      mythSummary: 'Casa del terror ubicada en la ciudad de Caracas.',
      found: false,
    },
    {
      id: 'imagen3', // ¡Importante! Este ID debe coincidir con el 'data-legend-id' en tu HTML
      name: 'Fantasma Prohibido',
      mythSummary:
        'Criatura majestuosa con cuerpo de un fantasma que no puede ingresar a un sitio.',
      found: false,
    },
    {
      id: 'imagen4', // ¡Importante! Este ID debe coincidir con el 'data-legend-id' en tu HTML
      name: 'Grupo de Fantasmas',
      mythSummary: 'Grupo de fantasmas saliendo de su casa.',
      found: false,
    },
    {
      id: 'imagen5', // ¡Importante! Este ID debe coincidir con el 'data-legend-id' en el HTML
      name: 'Calabera Fantasmal',
      mythSummary: 'Calabera de fantasma muy asustada.',
      found: false,
    },
    // Añade más leyendas aquí con sus IDs correspondientes a los `data-legend-id` en el HTML
  ];

  foundLegends: LegendCreature[] = []; // Array para almacenar las leyendas que el usuario ha descubierto
  private discoveryMessageElement: HTMLElement | null = null; // Referencia al elemento DOM para mostrar mensajes al usuario

  constructor(
    private router: Router,
    private alertController: AlertController, // Servicio para mostrar alertas de Ionic
    private toastController: ToastController // Servicio para mostrar mensajes Toast de Ionic
  ) {}

  ngOnInit() {
    // Intentar cargar las leyendas encontradas previamente desde el almacenamiento local del navegador
    const storedLegends = localStorage.getItem('foundLegends');
    if (storedLegends) {
      this.foundLegends = JSON.parse(storedLegends);
      // Actualizar el estado 'found' en la lista principal de leyendas
      this.foundLegends.forEach((found) => {
        const index = this.availableLegends.findIndex((l) => l.id === found.id);
        if (index !== -1) {
          this.availableLegends[index].found = true;
        }
      });
    }

    // Obtener la referencia al elemento donde se mostrarán los mensajes de descubrimiento
    this.discoveryMessageElement = document.getElementById('discovery-message');
    this.updateDiscoveryMessage(); // Mostrar mensaje inicial

    // Usar un setTimeout para dar tiempo a que A-Frame y AR.js se carguen completamente
    // y para que los elementos <a-scene>, <a-marker>, etc., estén disponibles en el DOM.
    setTimeout(() => {
      this.setupArInteractions();
    }, 1500); // 1.5 segundos de retraso. Puedes ajustar esto si es necesario.
  }

  ngOnDestroy() {
    // Limpiar los listeners de eventos cuando la página se destruye para evitar fugas de memoria
    this.removeArInteractions();
  }

  private setupArInteractions() {
    // Seleccionar todos los elementos 3D de leyenda definidos en el HTML
    const legendEntities = document.querySelectorAll('.legend-entity');

    legendEntities.forEach((entity) => {
      // Castear el elemento DOM genérico a 'AFRAME.AEntity' para que TypeScript
      // reconozca las propiedades y métodos específicos de las entidades de A-Frame.
      // const aframeEntity = entity as AFRAME.AEntity;
      const aframeEntity = entity as Entity;

      // Encontrar el elemento 'a-marker' padre de la entidad 3D
      const markerParent = aframeEntity.closest('a-marker');
      if (markerParent) {
        // Añadir listeners para cuando el marcador es encontrado o perdido por la cámara
        const onMarkerFoundHandler = (event: Event) =>
          this.onMarkerFound(event, aframeEntity);
        const onMarkerLostHandler = (event: Event) =>
          this.onMarkerLost(event, aframeEntity);

        markerParent.addEventListener('markerFound', onMarkerFoundHandler);
        markerParent.addEventListener('markerLost', onMarkerLostHandler);
      }

      // Añadir listener para cuando el usuario hace click/tap en el modelo 3D en la RA
      aframeEntity.addEventListener('click', () =>
        this.onLegendClick(aframeEntity)
      );
    });

    console.log('Listeners de AR configurados.');
  }

  private removeArInteractions() {
    // Remover los listeners de eventos para asegurar una limpieza adecuada
    const legendEntities = document.querySelectorAll('.legend-entity');
    legendEntities.forEach((entity) => {
      // const aframeEntity = entity as AFRAME.AEntity;
      const aframeEntity = entity as Entity;
      const markerParent = aframeEntity.closest('a-marker');
      if (markerParent) {
        markerParent.removeEventListener('markerFound', (event) =>
          this.onMarkerFound(event, aframeEntity)
        );
        markerParent.removeEventListener('markerLost', (event) =>
          this.onMarkerLost(event, aframeEntity)
        );
      }
      aframeEntity.removeEventListener('click', () =>
        this.onLegendClick(aframeEntity)
      );
    });
    console.log('Listeners de AR removidos.');
  }

  // Se activa cuando un marcador AR es detectado por la cámara
  private onMarkerFound(event: Event, entity: Entity) {
    const legendId = entity.getAttribute('data-legend-id');
    const legendName = entity.getAttribute('data-legend-name');
    console.log(`Marcador encontrado para: ${legendName} (ID: ${legendId})`);

    const legend = this.availableLegends.find((l) => l.id === legendId);
    if (legend && !legend.found) {
      this.updateDiscoveryMessage(
        `¡${legendName} ha aparecido! Tócalo para descubrirlo.`
      );
    } else if (legend && legend.found) {
      this.updateDiscoveryMessage(`Ya has encontrado al ${legendName}.`);
    }
  }

  // Se activa cuando un marcador AR deja de ser visible para la cámara
  private onMarkerLost(event: Event, entity: Entity) {
    const legendId = entity.getAttribute('data-legend-id');
    const legendName = entity.getAttribute('data-legend-name');
    console.log(`Marcador perdido para: ${legendName} (ID: ${legendId})`);

    // Si el marcador visible actualmente se pierde y no hay otros marcadores visibles,
    // restaurar el mensaje general de búsqueda.
    const foundOneStillVisible = Array.from(
      document.querySelectorAll('a-marker[visible="true"]')
    ).some((marker) => {
      const entityInside = marker.querySelector('.legend-entity');
      return (
        entityInside &&
        (entityInside as Entity).getAttribute('data-legend-id') !== legendId
      );
    });
    if (!foundOneStillVisible) {
      this.updateDiscoveryMessage('Sigue buscando leyendas...');
    }
  }

  // Maneja el evento cuando el usuario hace click/tap en un modelo 3D de leyenda
  private async onLegendClick(entity: Entity) {
    const legendId = entity.getAttribute('data-legend-id');
    const legendName = entity.getAttribute('data-legend-name');

    if (!legendId) {
      console.warn(
        'Entidad 3D sin ID de leyenda. Asegúrate del atributo data-legend-id.'
      );
      return;
    }

    const legend = this.availableLegends.find((l) => l.id === legendId);

    if (legend && !legend.found) {
      legend.found = true; // Marca la leyenda como encontrada en la lista principal
      this.foundLegends.push(legend); // Añade la leyenda a la colección del usuario
      this.saveFoundLegends(); // Guarda el progreso en localStorage

      this.updateDiscoveryMessage(`¡Has desenterrado al ${legendName}!`);
      this.presentToast(`¡"${legendName}" añadido a tu colección!`);

      // Opcional: Aquí podrías añadir animaciones de "captura" o efectos visuales en la RA.
      // Por ejemplo, para ocultar el modelo después de ser "cazado":
      // entity.setAttribute('visible', false);
    } else if (legend && legend.found) {
      this.presentToast(`Ya habías descubierto al ${legendName}.`);
    } else {
      console.warn(
        `Leyenda con ID ${legendId} no encontrada en availableLegends.`
      );
    }

    // Mostrar detalles de la leyenda en un alert de Ionic
    if (legend) {
      const alert = await this.alertController.create({
        header: legend.name,
        message: legend.mythSummary,
        buttons: [
          'Ok',
          {
            text: 'Ver Mito Completo',
            handler: () => {
              // Navegar a la página del mito en tu BooApp (asegúrate de que esta ruta exista)
              this.router.navigate(['/myth-detail', legend.id]);
            },
          },
        ],
      });
      await alert.present();
    }
  }

  // Actualiza el mensaje visible en el overlay de la UI para guiar al usuario
  private updateDiscoveryMessage(
    message: string = 'Escanea un marcador para encontrar una leyenda.'
  ) {
    if (this.discoveryMessageElement) {
      this.discoveryMessageElement.innerText = message;
    }
  }

  // Muestra un mensaje temporal en la parte inferior de la pantalla (Toast)
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  // Navega a la página de colección de leyendas encontradas
  viewCollection() {
    this.router.navigate(['/legend-collection'], {
      state: { legends: this.foundLegends }, // Pasa las leyendas encontradas a la página de colección
    });
  }

  // Guarda el array de leyendas encontradas en el localStorage del navegador para persistencia
  private saveFoundLegends() {
    localStorage.setItem('foundLegends', JSON.stringify(this.foundLegends));
  }
}
