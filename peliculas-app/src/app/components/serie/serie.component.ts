import { Component, Input } from '@angular/core';
import { Serie } from 'src/app/models/series';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent {

  @Input() series: Serie[] = [];

  public url: string = Global.url;

  public bandera: string = 'serie';

}
