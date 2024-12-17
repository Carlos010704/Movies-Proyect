import { Component, Input } from '@angular/core';
import { Pelicula } from 'src/app/models/peliculas';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent {

  @Input() peliculas: any = [];
  
  public bandera: string = 'movie';

  public url: string = Global.url;

  constructor(){}

}
