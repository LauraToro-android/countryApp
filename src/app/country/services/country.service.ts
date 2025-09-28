import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string,Country[]>();
  private queryCacheCountry = new Map<string,Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query : string): Observable<Country[]>{
    query = query.toLowerCase();
    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query)?? []);
    }
    //Peticion
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    //Respuesta
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      // tap evita que se vuelvan a hacer peticones repetidas, guarda busqueda en cache
      tap(countries => this.queryCacheCapital.set(query,countries)),
      catchError(error => {
        console.log('Error fetching', query, error);
        
        if(error.status == 404){
          
          return of ([]);
        }
        return throwError(() => new Error(`No se pudo obtener países con esta busqueda... ${query}`)
        );
       })
      );
      
    

  }

  searchByCountry(query: string): Observable<Country[]>{
    query = query.toLowerCase();
    // si ya está en cache la muestra desde el cache
    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query)?? []);

    }
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    //Respuesta
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      catchError(error => {
        console.log('Error fetching', query, error);
        
        if(error.status == 404){
          
          return of ([]);
        }
        return throwError(() => new Error(`No se pudo obtener países con esta busqueda... ${query}`)
        );
       })
      );
  }
  searchByRegion(region: Region): Observable<Country[]> {
  // Si ya está en caché, devolverla
  if (this.queryCacheRegion.has(region)) {
    return of(this.queryCacheRegion.get(region)!);
  }

  return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
    map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    tap(countries => this.queryCacheRegion.set(region, countries)),
    catchError(() => of ([]))
  );

}
  searchCountryByAlphaCode(code: string): Observable<Country[]>{
    code = code.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    //Respuesta
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError(error => {
        console.log('Error fetching', code, error);
        
        if(error.status == 404){
          
          return of ([]);
        }
        return throwError(() => new Error(`No se pudo obtener países con esr... ${code}`)
        );
       })
      );
  }

}
