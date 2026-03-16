import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';

import { FavoritesService } from '../../services/favorites.service';

import { PokemonBase } from '../../models/pokemon.model';

import { FAVORITES_TEXT } from '../../constants/pokemon.constants';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [PokemonCardComponent, RouterLink],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss'],
})
export class Favorites implements OnInit {
  private favoritesService = inject(FavoritesService);

  readonly text = FAVORITES_TEXT;

  favoritePokemons: PokemonBase[] = [];

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritePokemons = this.favoritesService.getFavorites();
  }

  removeFavorite(pokemonId: number): void {
    this.favoritePokemons = this.favoritesService.removeFavorite(pokemonId);
  }
}