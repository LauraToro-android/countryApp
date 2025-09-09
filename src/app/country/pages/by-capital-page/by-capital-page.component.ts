import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../../mappers/country.mapper';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  
})
export class ByCapitalPageComponent { 
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
      
      const c = CountryMapper.mapRestCountryArrayToCountryArray(countries);
      console.log(c);

    });
  }
  
}
