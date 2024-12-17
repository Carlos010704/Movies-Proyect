import { Component, OnInit } from '@angular/core';
import { PosterService } from 'src/app/services/poster.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pelicula } from 'src/app/models/peliculas';
import { Serie } from 'src/app/models/series';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers: [PosterService],
})
export class DetalleComponent implements OnInit {
  public imgVista: any = [];
  public poster: any = [];
  public bandera: string = '';

  public post: any[] = [];

  public url: string = Global.url;

  constructor(
    private _posterService: PosterService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let title = params['titulo'];
      this.bandera = params['true'];

      let movies = this._posterService.peliculas;
      let series = this._posterService.series;

      this._posterService.getSeries().subscribe(
        (response) => {
          let series = response;

          this._posterService.getPeliculas().subscribe(
            (response) => {
              let movies = response.all;   
                         

              let posters = [...series, ...movies];

              for (let i = 0; i < posters.length; i++) {
                if (posters[i].titulo == title) {
                  this.poster = posters[i];
                }
              }
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
