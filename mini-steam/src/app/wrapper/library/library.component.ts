import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { UserService } from '../../services/user.service';
import { Game } from '../../services/mock-data/games-mock-data.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryComponent implements OnInit {
  gamesInLibrary: Game[];


  constructor(
    private userService: UserService,
    private gamesService: GamesService
  ) {
    this.gamesInLibrary = this.gamesService.getGamesInLibrary();
  }


  ngOnInit(): void {}

}


