import { Injectable } from '@angular/core';
import * as games from '../../../mock-data/games.json';


@Injectable({
  providedIn: 'root'
})
export class GamesMockDataService {
  private games = Array.from(games);

  constructor() { }

  getAllGames(): Game[] {
    return this.games;
  }
}

export interface Game {
  id: number;
  name: string;
  price: number;
  description: string;
  tags: string[];
}
