import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import { PokemonBase } from '../../models/pokemon.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PokemonCardComponent, RouterLink],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage {
  pokemons: PokemonBase[] = [
    {
      id: 1,
      name: 'Bulbasaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    {
      id: 4,
      name: 'Charmander',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    },
    {
      id: 7,
      name: 'Squirtle',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    },
  ];
}