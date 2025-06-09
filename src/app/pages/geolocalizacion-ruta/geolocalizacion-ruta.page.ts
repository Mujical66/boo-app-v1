/* 
NOMBRE: geolocalizacion-ruta.page.ts
DESCRIPCION: Página de la logica para la Geolocalización de eventos paranormales.
DESARROLLADOR: Luis Mujica
FECHA: 2025-06-09
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-geolocalizacion-ruta',
  templateUrl: './geolocalizacion-ruta.page.html',
  styleUrls: ['./geolocalizacion-ruta.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonBackButton,
    CommonModule,
    FormsModule,
  ],
})
export class GeolocalizacionRutaPage implements OnInit {
  titulo: string = '';
  latitud: number = 0;
  longitud: number = 0;
  map: any;

  // Punto A: ubicación actual (se asigna en ngOnInit)
  puntoA = { lat: 0, lng: 0 };
  // Punto B: dinámico (del formulario)
  puntoB = { lat: 0, lng: 0 };

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    // 1. Obtén la ubicación actual del móvil
    try {
      const position = await Geolocation.getCurrentPosition();
      this.puntoA = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    } catch (error) {
      // Si falla, usa una ubicación por defecto
      this.puntoA = { lat: 10.1720055, lng: -68.0125474 };
    }

    // 2. Obtén los parámetros del punto B
    this.route.queryParams.subscribe((params) => {
      this.titulo = params['titulo'];
      this.latitud = Number(params['latitud']);
      this.longitud = Number(params['longitud']);
      this.puntoB = { lat: this.latitud, lng: this.longitud };
      setTimeout(() => this.initMap(), 0);
    });
  }

  async initMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.puntoB.lng, this.puntoB.lat],
      zoom: 14,
      accessToken:
        'pk.eyJ1IjoibXVqaWNhbC1jdXJzb3MiLCJhIjoiY203MXp6Yzh1MDU2ajJqb2NhYzlmenhrNCJ9.xV52k646pSJ3mYxUSz6XtA',
    });

    // Marcador A (partida)
    new mapboxgl.Marker({ color: 'green' })
      .setLngLat([this.puntoA.lng, this.puntoA.lat])
      .setPopup(new mapboxgl.Popup().setText('Punto A (Partida)'))
      .addTo(this.map);

    // Marcador B (llegada)
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([this.puntoB.lng, this.puntoB.lat])
      .setPopup(new mapboxgl.Popup().setText('Punto B (Llegada)'))
      .addTo(this.map);

    // Espera a que el mapa cargue y luego traza la ruta real por calles
    this.map.on('load', () => {
      this.trazarRutaCalles();
    });

    setTimeout(() => {
      this.map.resize();
    }, 300);
  }

  // Método para trazar la ruta real por calles usando Mapbox Directions API
  async trazarRutaCalles() {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.puntoA.lng},${this.puntoA.lat};${this.puntoB.lng},${this.puntoB.lat}?geometries=geojson&access_token=pk.eyJ1IjoibXVqaWNhbC1jdXJzb3MiLCJhIjoiY203MXp6Yzh1MDU2ajJqb2NhYzlmenhrNCJ9.xV52k646pSJ3mYxUSz6XtA`;

    const response = await fetch(url);
    const data = await response.json();
    const route = data.routes[0].geometry;

    // Agrega la ruta al mapa
    if (this.map.getSource('rutaCalles')) {
      (this.map.getSource('rutaCalles') as mapboxgl.GeoJSONSource).setData({
        type: 'Feature',
        geometry: route,
        properties: {},
      });
    } else {
      this.map.addSource('rutaCalles', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route,
          properties: {},
        },
      });
      this.map.addLayer({
        id: 'rutaCalles',
        type: 'line',
        source: 'rutaCalles',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#ff5733', 'line-width': 5 },
      });
    }
  }
}
