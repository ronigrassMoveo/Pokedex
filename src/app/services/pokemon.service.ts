import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonBase, PokemonDetails } from '../models/pokemon.model';
import {
  POKEMON_ENDPOINTS,
  PAGINATION,
  POKEMON_IMAGE_BASE_URL,
} from '../constants/pokemon.constants';
import { DEFAULT_POKEMON_FILTERS } from '../constants/pokemon-filter.constants';
import {
  PokemonColor,
  PokemonFilters,
  PokemonGeneration,
} from '../models/pokemon-filters.model';

interface NamedApiResource {
  name: string;
  url: string;
}

interface PokemonCandidate {
  id: number;
  name: string;
}

interface PokemonListResponse {
  count: number;
  results: NamedApiResource[];
}

interface PokemonResponse {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
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
  color: {
    name: string;
  } | null;
  is_legendary: boolean;
  is_mythical: boolean;
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

interface TypeResponse {
  pokemon: {
    pokemon: NamedApiResource;
  }[];
}

interface AbilityResponse {
  pokemon: {
    pokemon: NamedApiResource;
  }[];
}

interface PokemonColorResponse {
  pokemon_species: NamedApiResource[];
}

interface GenerationResponse {
  pokemon_species: NamedApiResource[];
}

export interface GetPokemonsRequest {
  search?: string;
  page?: number;
  pageSize?: number;
  filters?: PokemonFilters;
}

export interface GetPokemonsResponse {
  items: PokemonBase[];
  total: number;
  page: number;
  pageSize: number;
}

interface NormalizedGetPokemonsRequest {
  search: string;
  page: number;
  pageSize: number;
  filters: PokemonFilters;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

<<<<<<< Updated upstream
=======
  private pagesCache = new Map<string, GetPokemonsResponse>();
  private searchCache = new Map<string, GetPokemonsResponse>();
  private filteredCache = new Map<string, GetPokemonsResponse>();
  private pokemonDetailsCache = new Map<number, PokemonDetails>();

  private filterCandidatesCache = new Map<string, PokemonCandidate[]>();

  private readonly typeEndpoint = 'https://pokeapi.co/api/v2/type';
  private readonly abilityEndpoint = 'https://pokeapi.co/api/v2/ability';
  private readonly colorEndpoint = 'https://pokeapi.co/api/v2/pokemon-color';
  private readonly generationEndpoint = 'https://pokeapi.co/api/v2/generation';

>>>>>>> Stashed changes
  getPokemons(body: GetPokemonsRequest): Observable<GetPokemonsResponse> {
    const request = this.normalizeRequest(body);

<<<<<<< Updated upstream
    //earch by pokemon name
    if (search) {
      return this.http
        .get<PokemonResponse>(`${POKEMON_ENDPOINTS.pokemon}/${search}`)
        .pipe(
          map((pokemon) => {
            const item = this.mapToPokemonBase(pokemon.name, pokemon.id);

            return {
              items: [item],
              total: 1,
              page: PAGINATION.FIRST_PAGE,
              pageSize,
            };
          })
        );
    }

    //paging

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
        }))
      );
=======
    if (request.search) {
      return this.getSearchPokemons(request);
    }

    if (this.hasActiveFilters(request.filters)) {
      return this.getFilteredPokemons(request);
    }

    return this.getPaginatedPokemons(request);
>>>>>>> Stashed changes
  }

  getPokemonDetails(id: number): Observable<PokemonDetails> {
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
      })
    );
  }

<<<<<<< Updated upstream
=======
  private normalizeRequest(body: GetPokemonsRequest): NormalizedGetPokemonsRequest {
    return {
      search: body.search?.trim().toLowerCase() ?? '',
      page: Math.max(body.page ?? PAGINATION.FIRST_PAGE, PAGINATION.FIRST_PAGE),
      pageSize: Math.max(body.pageSize ?? PAGINATION.DEFAULT_PAGE_SIZE, 1),
      filters: {
        ...DEFAULT_POKEMON_FILTERS,
        ...body.filters,
      },
    };
  }

  private hasActiveFilters(filters: PokemonFilters): boolean {
    return Boolean(
      filters.type ||
      filters.ability ||
      filters.generation ||
      filters.color
    );
  }

  private getSearchPokemons(
    request: NormalizedGetPokemonsRequest
  ): Observable<GetPokemonsResponse> {
    const searchCacheKey = this.buildSearchCacheKey(
      request.search,
      request.pageSize
    );
    const cachedSearchResult = this.searchCache.get(searchCacheKey);

    if (cachedSearchResult) {
      return of(cachedSearchResult);
    }

    return this.http
      .get<PokemonResponse>(`${POKEMON_ENDPOINTS.pokemon}/${request.search}`)
      .pipe(
        map((pokemon) => {
          const response: GetPokemonsResponse = {
            items: [this.mapToPokemonBase(pokemon.name, pokemon.id)],
            total: 1,
            page: PAGINATION.FIRST_PAGE,
            pageSize: request.pageSize,
          };

          this.searchCache.set(searchCacheKey, response);
          return response;
        })
      );
  }

  private getPaginatedPokemons(
    request: NormalizedGetPokemonsRequest
  ): Observable<GetPokemonsResponse> {
    const pageCacheKey = this.buildPageCacheKey(request.page, request.pageSize);
    const cachedPage = this.pagesCache.get(pageCacheKey);

    if (cachedPage) {
      return of(cachedPage);
    }

    const offset = (request.page - 1) * request.pageSize;

    return this.http
      .get<PokemonListResponse>(
        `${POKEMON_ENDPOINTS.pokemon}?limit=${request.pageSize}&offset=${offset}`
      )
      .pipe(
        map((response) => ({
          items: response.results.map((pokemon) => {
            const id = this.extractId(pokemon.url);
            return this.mapToPokemonBase(pokemon.name, id);
          }),
          total: response.count,
          page: request.page,
          pageSize: request.pageSize,
        })),
        tap((response) => {
          this.pagesCache.set(pageCacheKey, response);
        })
      );
  }

  private getFilteredPokemons(
    request: NormalizedGetPokemonsRequest
  ): Observable<GetPokemonsResponse> {
    const cacheKey = this.buildFilteredCacheKey(request);
    const cachedResult = this.filteredCache.get(cacheKey);

    if (cachedResult) {
      return of(cachedResult);
    }

    return this.getMatchingPokemonCandidates(request.filters).pipe(
      map((items) => this.sortCandidates(items)),
      map((items) =>
        this.paginateCandidates(items, request.page, request.pageSize)
      ),
      map(({ pagedItems, total }) => ({
        items: pagedItems.map((pokemon) =>
          this.mapToPokemonBase(pokemon.name, pokemon.id)
        ),
        total,
        page: request.page,
        pageSize: request.pageSize,
      })),
      tap((response) => {
        this.filteredCache.set(cacheKey, response);
      })
    );
  }

  private getMatchingPokemonCandidates(
    filters: PokemonFilters
  ): Observable<PokemonCandidate[]> {
    const groups: Observable<PokemonCandidate[]>[] = [];

    if (filters.type) {
      groups.push(this.getCandidatesByType(filters.type));
    }

    if (filters.ability) {
      groups.push(this.getCandidatesByAbility(filters.ability));
    }

    if (filters.color) {
      groups.push(this.getCandidatesByColor(filters.color));
    }

    if (filters.generation) {
      groups.push(this.getCandidatesByGeneration(filters.generation));
    }

    if (!groups.length) {
      return of([]);
    }

    return forkJoin(groups).pipe(
      map((candidateGroups) => this.intersectCandidateGroups(candidateGroups))
    );
  }

  private getCandidatesByType(type: string): Observable<PokemonCandidate[]> {
    const cacheKey = `type:${type}`;
    const cachedCandidates = this.filterCandidatesCache.get(cacheKey);

    if (cachedCandidates) {
      return of(cachedCandidates);
    }

    return this.http
      .get<TypeResponse>(`${this.typeEndpoint}/${type}`)
      .pipe(
        map((response) =>
          response.pokemon.map((item) => ({
            id: this.extractId(item.pokemon.url),
            name: item.pokemon.name,
          }))
        ),
        tap((items) => {
          this.filterCandidatesCache.set(cacheKey, items);
        })
      );
  }

  private getCandidatesByAbility(
    ability: string
  ): Observable<PokemonCandidate[]> {
    const cacheKey = `ability:${ability}`;
    const cachedCandidates = this.filterCandidatesCache.get(cacheKey);

    if (cachedCandidates) {
      return of(cachedCandidates);
    }

    return this.http
      .get<AbilityResponse>(`${this.abilityEndpoint}/${ability}`)
      .pipe(
        map((response) =>
          response.pokemon.map((item) => ({
            id: this.extractId(item.pokemon.url),
            name: item.pokemon.name,
          }))
        ),
        tap((items) => {
          this.filterCandidatesCache.set(cacheKey, items);
        })
      );
  }

  private getCandidatesByColor(
    color: PokemonColor
  ): Observable<PokemonCandidate[]> {
    const cacheKey = `color:${color}`;
    const cachedCandidates = this.filterCandidatesCache.get(cacheKey);

    if (cachedCandidates) {
      return of(cachedCandidates);
    }

    return this.http
      .get<PokemonColorResponse>(`${this.colorEndpoint}/${color}`)
      .pipe(
        map((response) =>
          response.pokemon_species.map((species) => ({
            id: this.extractId(species.url),
            name: species.name,
          }))
        ),
        tap((items) => {
          this.filterCandidatesCache.set(cacheKey, items);
        })
      );
  }

  private getCandidatesByGeneration(
    generation: PokemonGeneration
  ): Observable<PokemonCandidate[]> {
    const cacheKey = `generation:${generation}`;
    const cachedCandidates = this.filterCandidatesCache.get(cacheKey);

    if (cachedCandidates) {
      return of(cachedCandidates);
    }

    return this.http
      .get<GenerationResponse>(`${this.generationEndpoint}/${generation}`)
      .pipe(
        map((response) =>
          response.pokemon_species.map((species) => ({
            id: this.extractId(species.url),
            name: species.name,
          }))
        ),
        tap((items) => {
          this.filterCandidatesCache.set(cacheKey, items);
        })
      );
  }

  private intersectCandidateGroups(
    groups: PokemonCandidate[][]
  ): PokemonCandidate[] {
    if (!groups.length) {
      return [];
    }

    return groups.reduce((result, currentGroup) =>
      result.filter((pokemon) =>
        currentGroup.some((item) => item.id === pokemon.id)
      )
    );
  }

  private paginateCandidates(
    items: PokemonCandidate[],
    page: number,
    pageSize: number
  ): { pagedItems: PokemonCandidate[]; total: number } {
    const startIndex = (page - 1) * pageSize;

    return {
      pagedItems: items.slice(startIndex, startIndex + pageSize),
      total: items.length,
    };
  }

  private sortCandidates(items: PokemonCandidate[]): PokemonCandidate[] {
    const uniqueItems = items.filter(
      (pokemon, index, array) =>
        index === array.findIndex((item) => item.id === pokemon.id)
    );

    return uniqueItems.sort((first, second) => first.id - second.id);
  }

  private buildPageCacheKey(page: number, pageSize: number): string {
    return `page=${page}&pageSize=${pageSize}`;
  }

  private buildSearchCacheKey(search: string, pageSize: number): string {
    return `search=${search}&pageSize=${pageSize}`;
  }

  private buildFilteredCacheKey(request: NormalizedGetPokemonsRequest): string {
    return JSON.stringify(request);
  }

>>>>>>> Stashed changes
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