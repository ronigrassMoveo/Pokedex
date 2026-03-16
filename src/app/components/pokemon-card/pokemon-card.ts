import { Component, Input ,EventEmitter, Output} from '@angular/core';
import { PokemonBase, PokemonDetails } from '../../models/pokemon.model';
import { POKEMON_CARD_TEXT, FAVORITES_TEXT} from '../../constants/pokemon.constants';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrls: ['./pokemon-card.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon!: PokemonBase | PokemonDetails;
  @Input() variant: 'list' | 'details' = 'list';
  @Input() isFavorite = false;
  @Input() showFavoriteButton = false;
  @Input() showRemoveButton = false;

  @Output() favoriteToggled = new EventEmitter<void>();
  @Output() removeClicked = new EventEmitter<void>();

  readonly text = POKEMON_CARD_TEXT;
  readonly favoritesText = FAVORITES_TEXT;

  get formattedId(): string {
    return `#${this.pokemon.id.toString().padStart(3, '0')}`;
  }

  get totalStats(): number {
    if (!('stats' in this.pokemon)) {
      return 0;
    }

    return this.pokemon.stats.reduce((sum, stat) => sum + stat.value, 0);
  }

  getTypeClass(typeName: string): string {
    return `pokemon-card__type--${typeName.toLowerCase()}`;
  }

  onFavoriteClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteToggled.emit();
  }

  onRemoveClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.removeClicked.emit();
  }
}