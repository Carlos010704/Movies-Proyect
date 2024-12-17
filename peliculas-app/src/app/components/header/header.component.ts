import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from 'src/app/models/genero';
import { PosterService } from 'src/app/services/poster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PosterService]
})
export class HeaderComponent {

  public searchString: string = '';
  
  public generos: Genero[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _posterService: PosterService
  ){
    this.generos = this._posterService.genero;
  }

  search(){
    this._router.navigate(['/search', this.searchString]);
  }

  generoSearch(genero: string){
    this._router.navigate(['genero/', genero]);
    // this._router.navigate(['genero/', genero]);
  }

}
