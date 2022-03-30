import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FriendsModule } from './friends/friends.module';
import { ProfileModule } from './profile/profile.module';
import { WrapperRoutingModule } from './wrapper-routing.module';
import { WrapperComponent } from './wrapper.component';
import {GamesModule} from "./games/games.module";
import {LibraryModule} from "./library/library.module";



@NgModule({
  declarations: [
    WrapperComponent
  ],
  imports: [
    CommonModule,
    WrapperRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    ProfileModule,
    FriendsModule,
    GamesModule,
    LibraryModule
  ]
})
export class WrapperModule { }
