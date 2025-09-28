
import { Component, inject, signal, effect } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interfaces';
import { distinctUntilChanged, of, switchMap } from 'rxjs';
// ... otros imports iguales

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchInputComponent,
    CountryListComponent
  ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  private countryService = inject(CountryService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  // Inicializa query con el parámetro 'query' de la URL
  query = signal(this.activatedRoute.snapshot.queryParamMap.get('query') ?? '');
  query$ = toObservable(this.query);
  

  // Actualiza URL cada vez que cambia query
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

        this.router.navigate(['/country/by-capital'], {
          queryParams: {
            query,
          }
        });

        return this.countryService.searchByCapital(query.trim());
      })
    ),
    defaultValue: []
  });
}
