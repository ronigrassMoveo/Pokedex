import { Component, Input } from '@angular/core';
import { PokemonBase, PokemonDetails } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrls: ['./pokemon-card.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon!: PokemonBase | PokemonDetails;
  @Input() variant: 'list' | 'details' = 'list';
}