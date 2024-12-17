import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episodio } from 'src/app/models/episodios';
import { PosterService } from 'src/app/services/poster.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css'],
  providers: [PosterService],
})
export class ViewVideoComponent implements OnInit {
  public array: any[] = [];
  public data: any[] = [];
  public bandera: string = '';

  public episodios: Episodio[] = [];

  public play: boolean = false;
  public url: string = Global.url;

  constructor(
    private _posterService: PosterService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    let data = localStorage.getItem('data');
    let ep = localStorage.getItem('ep');

    if (data !== null) {
      this.data.push(JSON.parse(data));
    }

    if (ep !== null) {
      this.episodios = JSON.parse(ep);      
    }    

    this._route.params.subscribe((param) => {
      let episodioName = param['name'];
      this.bandera = param['true'];

      this.array = this.data.filter((e) => {
        return e;
      });
    });
  }

  volver(serie: string, bandera: string) {
    this._router.navigate([serie, bandera]);
  }

  previous(episodio: number) {
    this.play = false;
    this.episodios.filter((e) => {
      if (e.episodio == episodio - 1) {
        this.data = [];
        this.data.push(e);

        localStorage.setItem('newData', JSON.stringify(e));

        let local = localStorage.getItem('newData');

        if (local != null) {
          localStorage.setItem('data', local);
        }
      }
    });
  }

  next(episodio: number) {
    this.play = false;
    this.episodios.filter((e) => {
      if (e.episodio == episodio + 1) {
        this.data = [];
        this.data.push(e);

        localStorage.setItem('newData', JSON.stringify(e));

        let local = localStorage.getItem('newData');

        if (local != null) {
          localStorage.setItem('data', local);
        }
      }
    });
  }

  run(){
    this.play = true;
  }

}
