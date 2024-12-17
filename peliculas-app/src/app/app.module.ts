import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingProviders, routing } from './app.routing';
import { PosterService } from './services/poster.service';
import { HttpBackend, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { HomeComponent } from './components/home/home.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeriesComponent } from './components/series/series.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { SerieComponent } from './components/serie/serie.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { NoFountComponent } from './components/no-fount/no-fount.component';
import { SearchComponent } from './components/search/search.component';
import { GeneroSearchComponent } from './components/genero-search/genero-search.component';
import { VerComponent } from './components/ver/ver.component';
import { ViewVideoComponent } from './components/view-video/view-video.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarruselComponent,
    HomeComponent,
    PeliculasComponent,
    FooterComponent,
    SeriesComponent,
    PeliculaComponent,
    SerieComponent,
    DetalleComponent,
    NoFountComponent,
    SearchComponent,
    GeneroSearchComponent,
    VerComponent,
    ViewVideoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders, PosterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
