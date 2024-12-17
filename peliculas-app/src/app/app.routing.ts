// Importar modulos de rutas.
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Importar los modulos que tendran rutas
import { HomeComponent } from "./components/home/home.component";
import { PeliculasComponent } from "./components/peliculas/peliculas.component";
import { SeriesComponent } from "./components/series/series.component";
import { DetalleComponent } from "./components/detalle/detalle.component";
import { NoFountComponent } from "./components/no-fount/no-fount.component";
import { SearchComponent } from "./components/search/search.component";
import { GeneroSearchComponent } from "./components/genero-search/genero-search.component";
import { ViewVideoComponent } from "./components/view-video/view-video.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'series', component: SeriesComponent },
    { path: 'search/:string', component: SearchComponent },
    { path: 'genero/:string', component: GeneroSearchComponent},
    { path: ':titulo/:true', component: DetalleComponent },
    { path: 'view/:name/:true', component: ViewVideoComponent },
    { path: '**', component: NoFountComponent }
];

// Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);