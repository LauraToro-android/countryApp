import { Component, computed, inject, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interfaces';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-country-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {

  country = input.required<Country>();
  sanitizer = inject(DomSanitizer);


  currentYear = computed(() => {
    return new Date().getFullYear();
  })
  currenciesDisplay = computed(() => {
  const currencies = this.country().currencies;
  if (!currencies) return [];

  return Object.values(currencies).map(curr => `${curr.name} (${curr.symbol})`);
  });

  capitalMapUrl = computed<SafeResourceUrl | null>(() => {
    const latlng = this.country().capitalInfo?.latlng;
    if (latlng && latlng.length === 2) {
      const [lat, lng] = latlng;
      const url = `https://maps.google.com/maps?q=${lat},${lng}&z=6&output=embed`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return null;
  });

  giniColor() {
  const gini = this.country().gini;
  if (gini === undefined) return 'text-gray-400';      // gris para no disponible
  if (gini < 30) return 'text-green-500';             // verde para baja desigualdad
  if (gini < 50) return 'text-yellow-500';            // amarillo para media
  return 'text-red-500';                               // rojo para alta
}

languagesDisplay(): string[] {
  // Forzamos a que 'languages' sea un objeto con claves dinámicas y valores string
  const langs = this.country().languages as { [key: string]: string } | undefined;
  return langs ? Object.values(langs) : [];
}






}
