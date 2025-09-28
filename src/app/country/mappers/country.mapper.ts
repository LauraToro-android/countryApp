import { Country } from "../interfaces/country.interfaces";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";


export class CountryMapper{
    static mapRestCountryToCountry(restCountry: RESTCountry): Country {
        const giniValue = restCountry.gini
    ? Object.values(restCountry.gini)[0] // toma el primer valor del objeto (por año)
    : undefined;
        return{
            capital: restCountry.capital?.join(',') ?? 'Sin capital',
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common ?? 'No Spanish Name',
            population: restCountry.population,

            region: restCountry.region,
            subRegion: restCountry.subregion,
            currencies: restCountry.currencies,
            capitalInfo: restCountry.capitalInfo,
            maps: restCountry.maps,
            gini: giniValue,
            area: restCountry.area,
            borders: restCountry.borders,
            languages: restCountry.languages,
        };
    }
    static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
        return restCountries.map(this.mapRestCountryToCountry);
    }
    
}