import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
