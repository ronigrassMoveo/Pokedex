import { Component, Input } from '@angular/core';
import { PokemonBase, PokemonDetails } from '../../models/pokemon.model';

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
}