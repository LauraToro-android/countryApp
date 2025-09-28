import { Component, effect, inject, signal } from '@angular/core';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, switchMap, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { Region } from '../../interfaces/region.type';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'app-by-region-page',
  standalone: true,
  imports: [CommonModule, CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  private countryService = inject(CountryService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  // Cargar valor desde la URL al iniciar
  selectedRegion = signal<Region | null>(
    this.parseRegion(this.activatedRoute.snapshot.queryParamMap.get('region'))
  );
  selectedRegion$ = toObservable(this.selectedRegion);

  // ✅ Mantiene la URL sincronizada con la señal
  constructor() {
    // Actualiza la URL cada vez que cambia la región
    effect(() => {
      const region = this.selectedRegion();
      this.router.navigate([], {
        queryParams: { region: region || null },
        queryParamsHandling: 'merge',
      });
    });

    // Escucha cambios en la URL (por si navegas con el botón de atrás)
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const region = this.parseRegion(params.get('region'));
      if (region !== this.selectedRegion()) {
        this.selectedRegion.set(region);
      }
    });
  }

  // Fetch reactivo con rxResource
  readonly countryResource = rxResource<Country[], Region | null>({
    stream: () => this.selectedRegion$.pipe(
      distinctUntilChanged(),
      switchMap(region => region ? this.countryService.searchByRegion(region) : of([]))
    ),
    defaultValue: [],
  });

  // Método de selección
  onRegionSelected(region: Region) {
    this.selectedRegion.set(region);
  }

  // Validación simple de región
  private parseRegion(value: string | null): Region | null {
    if (this.regions.includes(value as Region)) {
      return value as Region;
    }
    return null;
  }
}

