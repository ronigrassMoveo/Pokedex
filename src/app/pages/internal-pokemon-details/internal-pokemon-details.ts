import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import { PokemonDetails } from '../../models/pokemon.model';
import { MOCK_POKEMON_DETAILS } from '../../mock-data/pokemons.mock';


@Component({
  selector: 'app-internal-pokemon-details',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './internal-pokemon-details.html',
  styleUrls: ['./internal-pokemon-details.scss'],
})

export class InternalPokemonDetails {
  pokemon: PokemonDetails = MOCK_POKEMON_DETAILS[1];

  constructor(private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemon = MOCK_POKEMON_DETAILS[id] ?? MOCK_POKEMON_DETAILS[1];
  }
}