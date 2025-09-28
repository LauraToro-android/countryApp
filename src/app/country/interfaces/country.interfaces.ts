import { CapitalInfo, Currencies, Languages, Maps } from "./rest-countries.interfaces";


export interface Country{
    cca2: string;
    flag: string;
    flagSvg: string;
    name: string;
    capital: string;
    population: number;

    region: string;
    subRegion: string;
    currencies: Currencies;
    capitalInfo?: CapitalInfo;
    maps?: Maps;
    gini?: number;
    area?: number;          // nuevo campo
    borders?: string[];
    languages?: Languages;
}