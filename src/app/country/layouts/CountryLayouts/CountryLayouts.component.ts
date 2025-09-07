import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";

@Component({
  selector: 'app-country-layouts',
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './CountryLayouts.component.html',
})
export class CountryLayoutsComponent { }
