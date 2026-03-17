import { Component, inject } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { APP_ROUTES, HEADER_TEXT } from '../../constants/pokemon.constants';
import { NavigationService } from '../../services/navigation.service';
import { ScreenService } from '../../services/screen.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  private router = inject(Router);
  private navigationService = inject(NavigationService);
  private screenService = inject(ScreenService);

  readonly text = HEADER_TEXT;
  readonly routes = APP_ROUTES;
  readonly isDesktop = this.screenService.isDesktop;
  readonly isMobile = this.screenService.isMobile;

  isMenuOpen = false;

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

   goHome(): void {
    this.closeMenu();
    this.navigationService.triggerHomeReset();
    this.router.navigate([this.routes.HOME]);
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
