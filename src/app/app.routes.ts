import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { InternalPokemonDetails } from './pages/internal-pokemon-details/internal-pokemon-details';
import { Favorites } from './pages/favorites/favorites';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'favorites',
    component: Favorites,
  },
  {
    path: 'pokemon/:id',
    component: InternalPokemonDetails
  }
];