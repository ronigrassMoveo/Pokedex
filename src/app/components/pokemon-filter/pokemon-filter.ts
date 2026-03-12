import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  DEFAULT_POKEMON_FILTERS,
  POKEMON_GENERATIONS,
  POKEMON_GENERATION_LABELS,
  POKEMON_COLORS,
  POKEMON_COLOR_LABELS,
} from '../../constants/pokemon-filter.constants';

import {
  PokemonFilters,
  PokemonColor,
} from '../../models/pokemon-filters.model';

@Component({
  selector: 'app-pokemon-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pokemon-filter.html',
  styleUrls: ['./pokemon-filter.scss'],
})
export class PokemonFilterComponent implements OnChanges {
  @Input() filters: PokemonFilters = { ...DEFAULT_POKEMON_FILTERS };

  @Output() apply = new EventEmitter<PokemonFilters>();
  @Output() clear = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  draftFilters: PokemonFilters = { ...DEFAULT_POKEMON_FILTERS };

  readonly generations = POKEMON_GENERATIONS;
  readonly generationLabels = POKEMON_GENERATION_LABELS;

  readonly colors = POKEMON_COLORS;
  readonly colorLabels = POKEMON_COLOR_LABELS;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.draftFilters = { ...this.filters };
    }
  }

  onSelectColor(color: PokemonColor): void {
    this.draftFilters.color =
      this.draftFilters.color === color ? null : color;
  }

  onApply(): void {
    this.apply.emit({ ...this.draftFilters });
  }

  onClear(): void {
    this.draftFilters = { ...DEFAULT_POKEMON_FILTERS };
    this.clear.emit();
  }

  onClose(): void {
    this.close.emit();
  }

  trackByValue(_: number, value: string): string {
    return value;
  }
}