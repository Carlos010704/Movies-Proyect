import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/peliculas';
import { PosterService } from 'src/app/services/poster.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PosterService],
})
export class PeliculasComponent implements OnInit {
  public peliculas: Pelicula[] = [];

  public pageSize = 20;
  public totalPages = 0;
  public allResults: any = [];
  public page = 1;

  constructor(private _posterService: PosterService) {}

  ngOnInit() {
    this._posterService.getPeliculas().subscribe(
      response => {
        this.peliculas = response.all;
        
      }
    );
  }
}
