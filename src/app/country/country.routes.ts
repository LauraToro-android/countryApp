import { Routes } from "@angular/router";
import { ByCapitalPageComponent } from "./pages/by-capital-page/by-capital-page.component";
import { CountryLayoutsComponent } from "./layouts/CountryLayouts/CountryLayouts.component";
import { ByCountryPageComponent } from "./pages/by-country-page/by-country-page.component";
import { ByRegionPageComponent } from "./pages/by-region-page/by-region-page.component";
import { CountryPageComponent } from "./pages/country-page/country-page.component";

export const countryRoutes: Routes = [
    {
        path: '',
       component: CountryLayoutsComponent,
       children: [
        {
            path: 'by-capital',
            component: ByCapitalPageComponent,
        },
        {
            path: 'by-country',
            component: ByCountryPageComponent,
        },
        {
            path: 'by-region',
            component: ByRegionPageComponent,
        },
        {
            path: 'by/:code',
            component: CountryPageComponent,
        },
        {
        path: '**',
        redirectTo: 'by-capital',
        },
       ],

    },

    //{
      //  path: 'country',

    //},

    
];

export default countryRoutes;