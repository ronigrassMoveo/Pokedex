import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { InternalPokemonDetails } from './pages/internal-pokemon-details/internal-pokemon-details';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'pokemon/:id',
    component: InternalPokemonDetails
  }
];