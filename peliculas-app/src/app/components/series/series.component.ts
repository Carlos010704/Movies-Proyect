import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/models/series';
import { PosterService } from 'src/app/services/poster.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
  providers: [PosterService]
})
export class SeriesComponent implements OnInit{

  public series: Serie[] = [];

  constructor(
    private _posterService: PosterService
  ){}

  ngOnInit():void {
    this._posterService.getSeries().subscribe(
      response => {
        this.series = response;   
            
      },
      error => {
        console.log(error);
        
      }
    );
  }


}
