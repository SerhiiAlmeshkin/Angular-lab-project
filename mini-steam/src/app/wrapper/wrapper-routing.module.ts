import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard.service';
import { FriendsComponent } from './friends/friends.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfilePageComponent } from './profile/profile-page.component';
import { WrapperComponent } from './wrapper.component';
import { GamesComponent } from './games/games.component';
import { LibraryComponent } from './library/library.component';


const routes: Routes = [{
  path: '',
  component: WrapperComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    { path: '', redirectTo: 'games', pathMatch: 'full' },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'friends', component: FriendsComponent },
    { path: 'games', component: GamesComponent },
    { path: 'library', component: LibraryComponent },
    { path: 'not-found', component: NotFoundComponent }
  ]
}, {
  path: '**',
  redirectTo: 'not-found'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WrapperRoutingModule {}
