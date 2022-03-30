import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GamesComponent} from "./games.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule} from "@angular/material/slider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [ GamesComponent ],
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatSliderModule,
        MatCheckboxModule,
        MatGridListModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class GamesModule { }
