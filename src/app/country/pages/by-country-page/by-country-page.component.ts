import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent { 
  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<RESTCountry[]>([]);

  get countriesList(): RESTCountry[]{
    return this.countries();
  }

  onSearch(query: string){
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);
    this.countryService.searchByCapital(query).subscribe((countries) => {
      this.isLoading.set(false);
      this.countries.set(countries);
      console.log(countries);
    });
  }
}
