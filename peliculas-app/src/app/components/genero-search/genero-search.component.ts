import { Component, HostListener, OnInit } from '@angular/core';
import { PosterService } from 'src/app/services/poster.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Serie } from 'src/app/models/series';
import { Pelicula } from 'src/app/models/peliculas';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-genero-search',
  templateUrl: './genero-search.component.html',
  styleUrls: ['./genero-search.component.css'],
  providers: [PosterService],
})
export class GeneroSearchComponent implements OnInit {
  public generoString: string = '';
  public filterGenero: any[] = [];

  public bandera: string = '';

  public url: string = Global.url;

  constructor(
    private _posterService: PosterService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let genero = params['string'];
      this.generoString = genero;

      this._posterService.getSeries().subscribe(
        response => {
          let series = response;

          console.log(series)

          this._posterService.getPeliculas().subscribe(
            response => {
              let movies = response.all;

              let posters = [...movies, ...series];

              this.filterGenero = posters.filter((obj) => {
                return obj.genero.toLowerCase().includes(genero.toLowerCase());
              });
            },
            error => {
              console.log(error);
              
            }
          )
        },
        error => {
          console.log(error);
        }
      )
    });
  }


  type(name: string) {
    this.filterGenero.filter((obj) => {
      if (obj.title == name) {
        let array = [];
        array.push(obj);

        array.forEach((e: any) => {
          if (e instanceof Pelicula) {
            let bandera = 'movie';
            this._router.navigate(['/', obj.title, bandera]);
          } else if (e instanceof Serie) {
            let bandera = 'serie';
            this._router.navigate(['/', obj.title, bandera]);
          }
        });
      }
    });
  }
}
