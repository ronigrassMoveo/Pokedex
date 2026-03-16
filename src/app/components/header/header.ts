import { Component, inject } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { APP_ROUTES, HEADER_TEXT } from '../../constants/pokemon.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  private router = inject(Router);

  readonly text = HEADER_TEXT;
  readonly routes = APP_ROUTES;

  isMenuOpen = false;

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  get isHomeActive(): boolean {
    return (
      this.router.url === `/${this.routes.HOME}` ||
      this.router.url.startsWith('/pokemon/')
    );
  }

  get isFavoritesActive(): boolean {
    return this.router.url === `/${this.routes.FAVORITES}`;
  }
}
