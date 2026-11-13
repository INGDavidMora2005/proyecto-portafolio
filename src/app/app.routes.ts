import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio · David Mora',
    loadComponent: () => import('./features/inicio/inicio').then((m) => m.Inicio),
  },
  {
    path: 'perfil',
    title: 'Perfil · David Mora',
    loadComponent: () => import('./features/perfil/perfil').then((m) => m.Perfil),
  },
  {
    path: 'proyectos',
    title: 'Proyectos · David Mora',
    loadComponent: () => import('./features/proyectos/proyectos').then((m) => m.Proyectos),
  },
  {
    path: 'proyectos/:id',
    title: 'Detalle del proyecto · David Mora',
    loadComponent: () =>
      import('./features/proyecto-detalle/proyecto-detalle').then((m) => m.ProyectoDetalle),
  },
  {
    path: 'contacto',
    title: 'Contacto · David Mora',
    loadComponent: () => import('./features/contacto/contacto').then((m) => m.Contacto),
  },
  {
    path: '**',
    title: 'Página no encontrada · David Mora',
    loadComponent: () =>
      import('./features/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
  },
];
