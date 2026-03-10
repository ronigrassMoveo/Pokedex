import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import { MOCK_POKEMONS } from '../../mock-data/pokemons.mock';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PokemonCardComponent, RouterLink],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage {
    pokemons = MOCK_POKEMONS;
}