import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private readonly desktopBreakpoint = 1024;

  readonly isDesktop = signal(window.innerWidth >= this.desktopBreakpoint);
  readonly isMobile = signal(window.innerWidth < this.desktopBreakpoint);

  constructor() {
    window.addEventListener('resize', () => {
      const isDesktop = window.innerWidth >= this.desktopBreakpoint;
      this.isDesktop.set(isDesktop);
      this.isMobile.set(!isDesktop);
    });
  }
}