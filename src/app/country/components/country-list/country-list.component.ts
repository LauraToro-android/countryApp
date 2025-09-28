import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe, RouterLink],
  standalone: true,
  templateUrl: './country-list.component.html',
})
export class CountryListComponent { 
  countries = input.required<Country[]>();

 
}
