import { Injectable } from '@angular/core';
import { Game, GamesMockDataService } from './mock-data/games-mock-data.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private userService: UserService, private gamesMockDataService: GamesMockDataService) { }

  addGameToLibrary(gameID: number) {
    if (!this.userService.currentUser$.value) {
      return;
    }
    return this.userService.currentUser$.next({
      ...this.userService.currentUser$.value,
      games: [...this.userService.currentUser$.value.games, gameID]
    });
  }

  getGamesInLibrary(): Game[] {
    if (!this.userService.currentUser$.value) {
      return [];
    }
    const gameIDs = this.userService.currentUser$.value.games;
    return this.gamesMockDataService.getAllGames().filter(game => gameIDs.includes(game.id));
  }

  searchGames(
    searchQuery: string,
    slider: number,
    categories?: { [ key: string ]: boolean }
  ): Game[] {
    let foundGames = this.gamesMockDataService.getAllGames().filter(game => !this.getGamesInLibrary()
      .includes(game));

    if (categories) {
      for (let tag in categories) {
        if (categories[ tag ]) {
          foundGames = foundGames.filter(game => game.tags.includes(tag));
        }
      }
    }

    foundGames = foundGames.filter(game => game.price <= slider);

    foundGames = foundGames.filter(game => game.name.toLowerCase()
      .includes(searchQuery.toLowerCase()));

    return foundGames;
  }
}
