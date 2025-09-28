import { Component, effect, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  standalone: true,
})
export class ByCountryPageComponent { 
  private countryService = inject(CountryService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  query = signal(this.activatedRoute.snapshot.queryParamMap.get('query') ?? '');
  query$ = toObservable(this.query); // ✅ se define en contexto de inyección

  constructor() {
    effect(() => {
      const q = this.query();
      this.router.navigate([], {
        queryParams: { query: q || null },
        queryParamsHandling: 'merge',
      });
    });
  }

  countryResource = rxResource<Country[], unknown>({
  stream: () => this.query$.pipe(
    distinctUntilChanged(),
    switchMap(query => {
      if (!query.trim()) return of([]);

      // ✅ Actualiza la URL
      this.router.navigate(['/country/by-country'], {
        queryParams: { query },
        queryParamsHandling: 'merge'
      });

      // ✅ Devuelve el observable con los países
      return this.countryService.searchByCountry(query.trim());
    })
  ),
  defaultValue: []
});


  
  
}
