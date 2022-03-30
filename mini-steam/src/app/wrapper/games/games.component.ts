import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { GamesService } from '../../services/games.service';
import { Game, GamesMockDataService } from '../../services/mock-data/games-mock-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnInit {
  tags: Set<string>;
  games$ = new BehaviorSubject<Game[]>([]);
  form: FormGroup;
  maximumPrice: number;
  sliderValue$ = new BehaviorSubject<number | 'Any'>(0);

  constructor(
    private readonly gamesService: GamesService,
    private readonly gamesMockDataService: GamesMockDataService,
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) {
    this.tags = this.getTags();

    this.maximumPrice = this.getMaximumPrice();
    this.setSliderValue(this.maximumPrice);

    this.form = this.fb.group({
      searchField: [''],
      slider: this.maximumPrice,
      categories: this.fb.group(
        this.convertTagsToFormObject(this.tags)
      )
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(startWith({
      searchField: '',
      slider: this.maximumPrice
    }))
      .subscribe(({ searchField, slider, categories }) => {
        this.games$.next(this.gamesService.searchGames(searchField, slider, categories));
      });

    this.userService.currentUser$.subscribe((user) => {
      if (!user) {
        return;
      }

      this.games$.next(this.games$.value.filter(game => !this.gamesService.getGamesInLibrary()
          .includes(game)));
    });
  }

  addGameToLibrary(id: number) {
    this.gamesService.addGameToLibrary(id);
  }

  onSliderInput(value: number | null) {
    if (value) {
      this.setSliderValue(value);
    }
  }

  private getTags() {
    const tags = new Set<string>();
    this.gamesMockDataService.getAllGames().map(game => game.tags.forEach(tag => tags.add(tag)));
    return tags;
  }

  private getMaximumPrice() {
    const prices = this.gamesMockDataService.getAllGames().map(game => game.price);
    return Math.max(...prices);
  }

  private convertTagsToFormObject(tags: Set<string>) {
    let tagsCheckBoxes: { [ name: string ]: boolean; } = {};
    tags.forEach(tag => tagsCheckBoxes[ tag ] = false);
    return tagsCheckBoxes;
  }

  private setSliderValue(value: number) {
    this.sliderValue$.next(value === this.maximumPrice ? 'Any' : value);
  }

}
