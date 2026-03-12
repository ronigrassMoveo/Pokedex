import { ChangeDetectorRef, Component, OnInit, inject , ElementRef, HostListener, ViewChild,} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonBase } from '../../models/pokemon.model';
import { PAGINATION, SEARCH } from '../../constants/pokemon.constants';
import { SearchHistoryService } from '../../services/search-history.service';
import { SEARCH_HISTORY } from '../../constants/pokemon.constants';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PokemonCardComponent, RouterLink, FormsModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage implements OnInit {
  private pokemonService = inject(PokemonService);
  private cdr = inject(ChangeDetectorRef);
  private searchHistoryService = inject(SearchHistoryService);
  pokemons: PokemonBase[] = [];

  currentPage = PAGINATION.FIRST_PAGE;
  pageSize = PAGINATION.DEFAULT_PAGE_SIZE;
  total = 0;

  searchTerm = SEARCH.EMPTY_QUERY;
  searchInput = SEARCH.EMPTY_QUERY;

  pokemonNotFound = false;
  searchHistory: string[] = [];
  showSearchHistory = false;
  @ViewChild('searchContainer') searchContainer?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.searchHistory = this.searchHistoryService.getHistory();
    this.loadPokemons(true);
  }

  loadPokemons(reset = false): void {
  this.pokemonService
    .getPokemons({
      search: this.searchTerm,
      page: this.currentPage,
      pageSize: this.pageSize,
    })
    .subscribe({
      next: (response) => {
        this.pokemonNotFound = false;

        this.total = response.total;

        this.pokemons = reset
          ? response.items
          : [...this.pokemons, ...response.items];

        this.cdr.detectChanges();
      },
      error: () => {
        this.pokemons = [];
        this.total = 0;
        this.pokemonNotFound = true;

        this.cdr.detectChanges();
      },
    });
  }

  // onSearch(): void {
  //   this.searchTerm = this.searchInput.trim().toLowerCase();
  //   this.currentPage = PAGINATION.FIRST_PAGE;
  //   this.pokemonNotFound = false;
  //   this.loadPokemons(true);
  // }

  onSearch(): void {
  this.searchTerm = this.searchInput.trim().toLowerCase();
  this.currentPage = PAGINATION.FIRST_PAGE;
  this.pokemonNotFound = false;
  if (this.searchTerm) {
    this.searchHistory = this.searchHistoryService.saveSearch(this.searchTerm);
  }
  this.loadPokemons(true);
  }

  clearSearch(): void {
    this.searchInput = SEARCH.EMPTY_QUERY;
    this.searchTerm = SEARCH.EMPTY_QUERY;
    this.currentPage = PAGINATION.FIRST_PAGE;
    this.loadPokemons(true);
  }

  onSearchInputChange(): void {
  if (this.searchInput.trim() !== '') {
    return;
  }
  this.searchTerm = SEARCH.EMPTY_QUERY;
  this.currentPage = PAGINATION.FIRST_PAGE;
  this.pokemonNotFound = false;
  this.loadPokemons(true);
  }

  selectHistoryItem(term: string): void {
    this.searchInput = term;
    this.onSearch();
    this.showSearchHistory = false;
  }

  removeHistoryItem(term: string): void {
    this.searchHistory = this.searchHistory.filter(
      (item) => item !== term
    );
    localStorage.setItem(
      SEARCH_HISTORY.STORAGE_KEY,
      JSON.stringify(this.searchHistory)
    );
  }

  clearSearchHistory(): void {
  this.searchHistory = [];
  localStorage.removeItem(SEARCH_HISTORY.STORAGE_KEY);
  this.showSearchHistory = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
  const target = event.target as Node | null;
  const container = this.searchContainer?.nativeElement;

  if (!container || !target) {
    return;
  }

  if (!container.contains(target)) {
    this.showSearchHistory = false;
  }
}

  loadMore(): void {
    this.currentPage += 1;
    this.loadPokemons();
  }

  get hasMore(): boolean {
    return this.pokemons.length < this.total;
  }
}