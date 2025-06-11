/* 
NOMBRE: app.routes.ts
DESCRIPCION: Archivo de rutas de la aplicación BooApp.
DESARROLLADOR: Luis Mujica
FECHA: 2025-06-03
PROYECTO: BooApp
VERSION: 1.0.0  
*/

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'menu-conexion', pathMatch: 'full' },
  {
    path: 'registrar-evento',
    loadComponent: () =>
      import('./pages/registrar-evento/registrar-evento.page').then(
        (m) => m.RegistrarEventoPage
      ),
  },
  {
    path: 'list-crud-evento',
    loadComponent: () =>
      import('./pages/list-crud-evento/list-crud-evento.page').then(
        (m) => m.ListCrudEventoPage
      ),
  },
  {
    path: 'patch-evento',
    loadComponent: () =>
      import('./pages/patch-evento/patch-evento.page').then(
        (m) => m.PatchEventoPage
      ),
  },
  {
    path: 'delete-evento',
    loadComponent: () =>
      import('./pages/delete-evento/delete-evento.page').then(
        (m) => m.DeleteEventoPage
      ),
  },
  {
    path: 'undelete-evento',
    loadComponent: () =>
      import('./pages/undelete-evento/undelete-evento.page').then(
        (m) => m.UndeleteEventoPage
      ),
  },
  {
    path: 'menu-conexion',
    loadComponent: () =>
      import('./pages/menu-conexion/menu-conexion.page').then(
        (m) => m.MenuConexionPage
      ),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'geolocalizacion-ruta',
    loadComponent: () =>
      import('./pages/geolocalizacion-ruta/geolocalizacion-ruta.page').then(
        (m) => m.GeolocalizacionRutaPage
      ),
  },
  {
    path: 'list-mapa-ruta',
    loadComponent: () =>
      import('./pages/list-mapa-ruta/list-mapa-ruta.page').then(
        (m) => m.ListMapaRutaPage
      ),
  },
  {
    path: 'list-crud-logicaldelete',
    loadComponent: () =>
      import(
        './pages/list-crud-logicaldelete/list-crud-logicaldelete.page'
      ).then((m) => m.ListCrudLogicaldeletePage),
  },
  {
    path: 'ar-view',
    loadComponent: () =>
      import('./pages/ar-view/ar-view.page').then((m) => m.ArViewPage),
  },
  {
    path: 'myth-detail/:id',
    loadComponent: () =>
      import('./pages/myth-detail/myth-detail.page').then(
        (m) => m.MythDetailPage
      ),
  },
  {
    path: 'legend-collection',
    loadComponent: () =>
      import('./pages/legend-collection/legend-collection.page').then(
        (m) => m.LegendCollectionPage
      ),
  },
];
