import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe],
  standalone: true,
  templateUrl: './country-list.component.html',
})
export class CountryListComponent { 
  countries = input.required<Country[]>();
}
