import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';

@Component({
  selector: 'app-country-list',
  imports: [],
  standalone: true,
  templateUrl: './country-list.component.html',
})
export class CountryListComponent { 
  countries = input.required<RESTCountry[]>();
}
