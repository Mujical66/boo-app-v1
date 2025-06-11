import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; // Para acceder al estado de navegación

// Opcional: Re-usar la interfaz LegendCreature si la definiste en otro lugar
interface LegendCreature {
  id: string;
  name: string;
  mythSummary: string;
  found: boolean;
}

@Component({
  selector: 'app-legend-collection',
  templateUrl: './legend-collection.page.html',
  styleUrls: ['./legend-collection.page.scss'],
  standalone: true, // ¡Confirmación de que es un componente standalone!
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LegendCollectionPage implements OnInit {
  collectedLegends: LegendCreature[] = [];

  constructor(private router: Router) {
    // Recupera los datos pasados a través del estado de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['legends']) {
      this.collectedLegends = navigation.extras.state['legends'];
    }
  }

  ngOnInit() {
    // Si la página se recarga o se accede directamente, cargar desde localStorage
    if (this.collectedLegends.length === 0) {
      const storedLegends = localStorage.getItem('foundLegends');
      if (storedLegends) {
        this.collectedLegends = JSON.parse(storedLegends);
      }
    }
  }

  viewMythDetail(legendId: string) {
    this.router.navigate(['/myth-detail', legendId]);
  }
}
