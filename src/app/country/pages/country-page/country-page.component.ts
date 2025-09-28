import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { distinctUntilChanged, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  standalone: true,
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NotFoundComponent, CountryInformationComponent],
  
})
export class CountryPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private countryService = inject(CountryService);

  // Creamos un signal para la clave (código del país)
  countryCode = signal(this.activatedRoute.snapshot.params['code']);


  code = signal('');
  code$ = toObservable(this.countryCode); // ✅ se define en contexto de inyección

  countryResource = rxResource<Country[], unknown>({
    stream: () => this.code$.pipe(
      distinctUntilChanged(),
      switchMap(code => {
        if (!code.trim()) return of([]);
        return this.countryService.searchCountryByAlphaCode(code.trim());
      })
    ),
    defaultValue: []
  });

  
  
}


