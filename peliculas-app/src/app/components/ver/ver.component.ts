import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { empty } from 'rxjs';
import { Episodio } from 'src/app/models/episodios';
import { Global } from 'src/app/services/global';
import { PosterService } from 'src/app/services/poster.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css'],
  providers: [PosterService],
})
export class VerComponent implements OnInit {
  @Input() pelicula: any = [];
  @Input() bandera: string = '';
  @Input() poster: any = [];

  public temporadas: number[] = [];
  public episodios: any[] = [];

  public temp: number = 1;

  public titulo: string = '';

  public url: string = Global.url;

  public play: boolean = false;

  constructor(
    private _posterService: PosterService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.bandera = params['true'];
      this.titulo = params['titulo'];

      this._posterService.getTemporada(this.titulo).subscribe((response) => {
        for (let i = 1; i <= response.length; i++) {
          this.temporadas.push(i);
        }
      });

      this._posterService.getEpisodios(this.titulo).subscribe((response) => {
        this.episodios = response;

        this.option();
      });
    });
  }

  option() {
    this._posterService.getEpisodios(this.titulo).subscribe((response) => {
      // this.cap = response;
      let episodios = response;

      // Vaciar arrglo
      this.episodios.splice(0, this.episodios.length);

      for (let i = 0; i < episodios.length; i++) {
        if (
          episodios[i].serie == this.poster.titulo &&
          episodios[i].temporada == this.temp
        ) {
          this.poster.episodios = [];

          // Asignar episodios al poster
          this.poster.episodios.push(episodios[i]);

          for (let ep of this.poster.episodios) {
            this.episodios.push(ep);
          }
        }
      }
    });
  }

  ver(name: string) {
    this.episodios.filter((e) => {
      if (e.nombre == name) {
        localStorage.setItem('data', JSON.stringify(e));
        localStorage.setItem('ep', JSON.stringify(this.episodios));

        this._router.navigate(['/view/', name, this.bandera]);
      }
    });
  }

  run(){
    this.play = true;
  }
}
