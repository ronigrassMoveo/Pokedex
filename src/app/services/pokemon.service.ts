import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PokemonBase, PokemonDetails } from '../models/pokemon.model';
import {
  POKEMON_ENDPOINTS,
  PAGINATION,
  POKEMON_IMAGE_BASE_URL,
} from '../constants/pokemon.constants';

interface PokemonListResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

interface PokemonResponse {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

interface PokemonSpeciesResponse {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

export interface GetPokemonsRequest {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface GetPokemonsResponse {
  items: PokemonBase[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  private pagesCache = new Map<string, GetPokemonsResponse>();
  private searchCache = new Map<string, GetPokemonsResponse>();
  private pokemonDetailsCache = new Map<number, PokemonDetails>();

  getPokemons(body: GetPokemonsRequest): Observable<GetPokemonsResponse> {
    const search = body.search?.trim().toLowerCase() ?? '';
    const page = Math.max(body.page ?? PAGINATION.FIRST_PAGE, PAGINATION.FIRST_PAGE);
    const pageSize = Math.max(body.pageSize ?? PAGINATION.DEFAULT_PAGE_SIZE, 1);

    if (search) {
      const searchCacheKey = this.buildSearchCacheKey(search, pageSize);
      const cachedSearchResult = this.searchCache.get(searchCacheKey);

      if (cachedSearchResult) {
        return of(cachedSearchResult);
      }

      return this.http
        .get<PokemonResponse>(`${POKEMON_ENDPOINTS.pokemon}/${search}`)
        .pipe(
          map((pokemon) => {
            const response: GetPokemonsResponse = {
              items: [this.mapToPokemonBase(pokemon.name, pokemon.id)],
              total: 1,
              page: PAGINATION.FIRST_PAGE,
              pageSize,
            };

            this.searchCache.set(searchCacheKey, response);
            return response;
          })
        );
    }

    const pageCacheKey = this.buildPageCacheKey(page, pageSize);
    const cachedPage = this.pagesCache.get(pageCacheKey);

    if (cachedPage) {
      return of(cachedPage);
    }

    const offset = (page - 1) * pageSize;

    return this.http
      .get<PokemonListResponse>(
        `${POKEMON_ENDPOINTS.pokemon}?limit=${pageSize}&offset=${offset}`
      )
      .pipe(
        map((response) => ({
          items: response.results.map((pokemon) => {
            const id = this.extractId(pokemon.url);
            return this.mapToPokemonBase(pokemon.name, id);
          }),
          total: response.count,
          page,
          pageSize,
        })),
        tap((response) => {
          this.pagesCache.set(pageCacheKey, response);
        })
      );
  }

  getPokemonDetails(id: number): Observable<PokemonDetails> {
    const cachedPokemonDetails = this.pokemonDetailsCache.get(id);

    if (cachedPokemonDetails) {
      return of(cachedPokemonDetails);
    }

    return forkJoin({
      pokemon: this.http.get<PokemonResponse>(
        `${POKEMON_ENDPOINTS.pokemon}/${id}`
      ),
      species: this.http.get<PokemonSpeciesResponse>(
        `${POKEMON_ENDPOINTS.species}/${id}`
      ),
    }).pipe(
      map(({ pokemon, species }) => {
        const basePokemon = this.mapToPokemonBase(pokemon.name, pokemon.id);

        return {
          ...basePokemon,
          types: pokemon.types.map((typeItem) => ({
            name: typeItem.type.name,
          })),
          description: this.extractEnglishDescription(species),
          stats: pokemon.stats.map((statItem) => ({
            name: statItem.stat.name,
            value: statItem.base_stat,
          })),
        };
      }),
      tap((pokemonDetails) => {
        this.pokemonDetailsCache.set(id, pokemonDetails);
      })
    );
  }

  private buildPageCacheKey(page: number, pageSize: number): string {
    return `page=${page}&pageSize=${pageSize}`;
  }

  private buildSearchCacheKey(search: string, pageSize: number): string {
    return `search=${search}&pageSize=${pageSize}`;
  }

  private mapToPokemonBase(name: string, id: number): PokemonBase {
    return {
      id,
      name,
      image: this.buildImageUrl(id),
    };
  }

  private extractEnglishDescription(species: PokemonSpeciesResponse): string {
    const englishEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    );

    if (!englishEntry) {
      return '';
    }

    return englishEntry.flavor_text
      .replace(/\f/g, ' ')
      .replace(/\n/g, ' ')
      .trim();
  }

  private extractId(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]);
  }

  private buildImageUrl(id: number): string {
    return `${POKEMON_IMAGE_BASE_URL}/${id}.png`;
  }
}