import { Component, OnInit } from '@angular/core';
import { PosterService } from 'src/app/services/poster.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pelicula } from 'src/app/models/peliculas';
import { Serie } from 'src/app/models/series';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [PosterService],
})
export class SearchComponent implements OnInit {

  public filter: any[] = [];
  public searchString: string = '';

  // public bandera: string = '';
  public url: string = Global.url;


  constructor(
    private _posterService: PosterService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params) => {
      let string = params['string'];
      this.searchString = string;

      this._posterService.getSeries().subscribe(
        response => {
          let series = response;

          this._posterService.getPeliculas().subscribe(
            response => {
              let movies = response.all;

              let posters = [...movies, ...series];

              this.filter = posters.filter((obj) => {
                return obj.titulo.toLowerCase().includes(string.toLowerCase());
              });

              console.log(this.filter)
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

  type(title: string){
    this.filter.filter( obj => {
      if(obj.title == title){
        let array = [];
        array.push(obj);

        array.forEach(e => {
          if( e instanceof Pelicula ){
            let bandera = 'movie';
            this._router.navigate(['/', obj.title, bandera]);
          } else if( e instanceof Serie ){
            let bandera = 'serie';
            this._router.navigate(['/', obj.title, bandera]);
          }
        })
      }
    })
  }
}
