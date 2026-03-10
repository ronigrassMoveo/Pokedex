import { Injectable } from '@angular/core';
import { SEARCH_HISTORY } from '../constants/pokemon.constants';

@Injectable({
  providedIn: 'root',
})
export class SearchHistoryService {
  getHistory(): string[] {
    const rawHistory = localStorage.getItem(SEARCH_HISTORY.STORAGE_KEY);

    if (!rawHistory) {
      return [];
    }

    try {
      const parsedHistory = JSON.parse(rawHistory);

      return Array.isArray(parsedHistory) ? parsedHistory : [];
    } catch {
      return [];
    }
  }

  saveSearch(searchTerm: string): string[] {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return this.getHistory();
    }

    const currentHistory = this.getHistory();

    const updatedHistory = [
      normalizedTerm,
      ...currentHistory.filter((item) => item !== normalizedTerm),
    ].slice(0, SEARCH_HISTORY.MAX_ITEMS);

    localStorage.setItem(
      SEARCH_HISTORY.STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );

    return updatedHistory;
  }

  clearHistory(): void {
    localStorage.removeItem(SEARCH_HISTORY.STORAGE_KEY);
  }
}