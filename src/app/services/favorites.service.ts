import { Injectable } from '@angular/core';
import { PokemonBase } from '../models/pokemon.model';
import { FAVORITES_TEXT } from '../constants/pokemon.constants';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  getFavorites(): PokemonBase[] {
    const rawFavorites = localStorage.getItem(FAVORITES_TEXT.STORAGE_KEY);

    if (!rawFavorites) {
      return [];
    }

    try {
      const parsedFavorites = JSON.parse(rawFavorites);

      return Array.isArray(parsedFavorites) ? parsedFavorites : [];
    } catch {
      return [];
    }
  }

  saveFavorite(pokemon: PokemonBase): PokemonBase[] {
    const currentFavorites = this.getFavorites();

    const isAlreadyFavorite = currentFavorites.some(
      (favorite) => favorite.id === pokemon.id
    );

    if (isAlreadyFavorite) {
      return currentFavorites;
    }

    const updatedFavorites = [...currentFavorites, pokemon];

    localStorage.setItem(
      FAVORITES_TEXT.STORAGE_KEY,
      JSON.stringify(updatedFavorites)
    );

    return updatedFavorites;
  }

  removeFavorite(pokemonId: number): PokemonBase[] {
    const currentFavorites = this.getFavorites();

    const updatedFavorites = currentFavorites.filter(
      (favorite) => favorite.id !== pokemonId
    );

    localStorage.setItem(
      FAVORITES_TEXT.STORAGE_KEY,
      JSON.stringify(updatedFavorites)
    );

    return updatedFavorites;
  }

  isFavorite(pokemonId: number): boolean {
    return this.getFavorites().some((favorite) => favorite.id === pokemonId);
  }

  toggleFavorite(pokemon: PokemonBase): PokemonBase[] {
    if (this.isFavorite(pokemon.id)) {
      return this.removeFavorite(pokemon.id);
    }

    return this.saveFavorite(pokemon);
  }

  clearFavorites(): void {
    localStorage.removeItem(FAVORITES_TEXT.STORAGE_KEY);
  }
}