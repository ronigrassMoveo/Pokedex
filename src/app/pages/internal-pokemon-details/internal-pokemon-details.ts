import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import { PokemonDetails } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from '../../services/favorites.service';
import { ScreenService } from '../../services/screen.service';
import { APP_ROUTES } from '../../constants/pokemon.constants';

@Component({
  selector: 'app-internal-pokemon-details',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './internal-pokemon-details.html',
  styleUrls: ['./internal-pokemon-details.scss'],
})
export class InternalPokemonDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private cdr = inject(ChangeDetectorRef);
  private favoritesService = inject(FavoritesService);
  private screenService = inject(ScreenService);
  private router = inject(Router);

  readonly isDesktop = this.screenService.isDesktop;
  readonly routes = APP_ROUTES;

  pokemon?: PokemonDetails;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pokemonService.getPokemonDetails(id).subscribe({
      next: (pokemonDetails) => {
        this.pokemon = pokemonDetails;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('pokemon details load error:', error);
      },
    });
  }

  goBackHome(): void {
    this.router.navigate([this.routes.HOME]);
  }

  get isCurrentPokemonFavorite(): boolean {
    if (!this.pokemon) {
      return false;
    }

    return this.favoritesService.isFavorite(this.pokemon.id);
  }

  toggleFavorite(): void {
    if (!this.pokemon) {
      return;
    }

    this.favoritesService.toggleFavorite(this.pokemon);
  }
}
