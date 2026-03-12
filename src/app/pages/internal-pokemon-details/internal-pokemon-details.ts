import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import { PokemonDetails } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

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
}