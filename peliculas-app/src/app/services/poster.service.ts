import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pelicula } from '../models/peliculas';
import { Serie } from '../models/series';
import { Observable, map } from 'rxjs';
import { Genero } from '../models/genero';
import { Episodio } from '../models/episodios';
import { reject } from 'lodash';

@Injectable()
export class PosterService {
  public peliculas: Pelicula[] = [
    new Pelicula(
      'X-MEN: DAYS OF FUTURE PAST',
      'En el futuro, los mutantes luchan por sobrevivir en campos de concentración controlados por los terribles Centinelas de Industrias Trask. Para evitar ese mundo apocalíptico, los bandos de Charles Xavier y Magneto deberán unir fuerzas.',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/x-men-dias-del-futuro-pasado-1558962412.jpg',
      2014,
      'Acción/Aventura',
      '2h 12m',
      'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/538E36C20FD81793563BCDB786A7572628A26F73911CBA7F850C80EBA00359A1/scale?width=1200&aspectRatio=1.78&format=jpeg'
    ),
    new Pelicula(
      'RAPIDOS Y FURIOSOS X',
      'Abróchate los cinturones de seguridad: se acerca el final del camino.',
      'https://www.procinal.com/uploads/PELICULAS/Img_movies/Img_360x500/RAPIDOOS%20Y%20FURIOSOS%20X1.jpg',
      2023,
      'Acción/Aventura',
      '2h 21m',
      'https://www.infobae.com/new-resizer/ozPnXR_D9NG2_sre0VAqzVu-tbc=/992x661/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/5LGTFAJQTPYPZS6CBFQUC62KV4.jpg'
    ),
    new Pelicula(
      'SUPER MARIO BROSS: LA PELICULA',
      'Un fontanero llamado Mario viaja por un laberinto subterráneo con su hermano, Luigi, intentando salvar a una princesa capturada.',
      'https://archivos-cms.cinecolombia.com/images/5/6/0/0/40065-4-esl-CO/44c1afd60fb0-smb_cineco_2-poster_480x670.jpg',
      2023,
      'Aventura/Fantasía',
      '1h 32m',
      'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/02/super-mario-bros-pelicula-2953600.jpg?tf=3840x'
    ),
    new Pelicula(
      'AVATAR 2: THE WAY OF WATER',
      'Jake Sully y Neytiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las regiones de Pandora cuando una antigua amenaza reaparece.',
      'https://i.ebayimg.com/images/g/URcAAOSwC31jZQ11/s-l400.jpg',
      2022,
      'Ciencia Ficción/Acción',
      '3h 12m',
      'https://revistahush.com/wp-content/uploads/2022/11/Poster-y-Trailer-de-Avatar-The-Way-of-Life.webp'
    ),
    new Pelicula(
      'JOHN WICK 4',
      'John Wick descubre un camino para derrotar a la Alta Mesa. Pero para poder ganar su libertad, Wick deberá enfrentarse a un nuevo rival con poderosas alianzas en todo el mundo, capaz de convertir a viejos amigos en enemigos.',
      'https://preview.redd.it/john-wick-ch-4-poster-v0-gn8tocf45sra1.jpg?auto=webp&s=f5d7b38283e4464371ae4abce81c0226200107e2',
      2023,
      'Acción/Neo-noir',
      '2h 49m',
      'https://www.nacionflix.com/__export/1676655677395/sites/debate/img/2023/02/17/keanu-reeves-bill-skarsgard-donnie-yen-john-wick.jpg_1887440363.jpg'
    ),
    new Pelicula(
      'SHAZAM: FURY OF THE GODS',
      'Billy Batson y sus hermanos adoptivos Freddy, Mary, Pedro, Eugene y Darla, también dotados de superpoderes, tienen que enfrentarse a las tres hijas de Atlas: Hespera, Kalypso y Anthea.',
      'https://sm.ign.com/ign_es/screenshot/default/shzam2-vert-main-2764x4096-dom-1674589983500_jf3g.jpg',
      2023,
      'Acción/Fantasía',
      '2h 10m',
      'https://i.blogs.es/5d6174/shazam-fury-of-the-gods-poster-1-featured-01/1366_2000.jpeg'
    ),
    new Pelicula(
      'AVATAR',
      'Entramos en el mundo Avatar de la mano de Jake Sully, un ex-Marine en silla de ruedas, que ha sido reclutado para viajar a Pandora, donde existe un mineral raro y muy preciado que puede solucionar la crisis energética existente en la Tierra.',
      'https://i.ebayimg.com/images/g/CwEAAOSwv4xf5cdv/s-l1600.jpg',
      2009,
      'Ciencia Ficción/Acción',
      '2h 42m',
      'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2021/06/avatar-2366079.jpg?tf=1200x'
    ),
    new Pelicula(
      'EL EXORCISTA DEL PAPA',
      'Inspirada en los archivos reales del Padre Gabriele Amorth, Exorcista Principal del Vaticano, El Exorcista del Papa sigue a Amorth mientras investiga la terrorífica posesión de un niño que termina descubriendo una conspiración que hace siglos fue encubierta de manera desesperada por el Vaticano.',
      'https://www.aceprensa.com/wp-content/uploads/2023/04/el-exorcista-del-papa.jpg',
      2014,
      'Terror',
      '1h 43m',
      'https://www.infobae.com/new-resizer/OBAuKiFwp2mU1LJgcrqNeOLpgew=/1200x628/filters:format(webp):quality(85)//cloudfront-us-east-1.images.arcpublishing.com/infobae/SNSSGIP4LNH7RHEMBVZLJX6AUE.jpg'
    ),
  ];

  public series: Serie[] = [
    new Serie(
      'LUCIFER',
      'Aburrido de ser amo del infierno, el diablo se muda a Los Ángeles donde abre un club nocturno y se relaciona con una detective de homicidios.',
      'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2017/02/lucifer-serie-tv-cartel.jpg?tf=1200x',
      2016,
      'Drama',
      '6',
      'https://occ-0-1433-37.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABeFYtLG_NLWAlFT3z_IgAqvNy7j1-Y54dz8W-2vWI5pLl6ehREXrnsKhycRwArYvCwmOwFEwSoTDarrRXAmmSp01KEsNZCW3SR4J.jpg?r=f6c',
      []
    ),
    new Serie(
      'STRANGER THINGS',
      'Después de la extraña desaparición de un niño, un pueblo se encuentra ante un misterio que revela experimentos secretos, fuerzas sobrenaturales y a una niña muy especial.',
      'https://media.revistagq.com/photos/5ca5fb0ab73808ff56819707/master/w_1600%2Cc_limit/stranger_things_8244.jpg',
      2016,
      'Drama',
      '4',
      'https://images.ctfassets.net/4cd45et68cgf/5DIYYKy9JB7m90nozSIcM1/2acf7e826bbe6a656fd91c9179f17e0b/Stranger_Things__The_Experience.jpg?w=2000',
      []
    ),
    new Serie(
      'THE WALKING DEAD',
      'Alejandría está severamente comprometida tras la devastación dejada por los Susurradores. Ahora todos luchan por refortificarla y alimentar a su creciente número de residentes, que incluyen a los sobrevivientes de la caída del Reino y la quema de Hilltop; junto con Maggie y su nuevo grupo, los Guardianes.',
      'https://1.bp.blogspot.com/-fDyhiy99mZU/UEfWGYFknnI/AAAAAAAARjQ/loa_2MgL2fA/s1600/the-walking-dead-s3-poster.jpg',
      2010,
      'Terror',
      '11',
      'https://fondosmil.com/fondo/35352.jpg',
      []
    ),
    new Serie(
      'THE WITCHER',
      'Geralt de Rivia, el legendario brujo cazador de monstruos, gravita inexorablemente hacia su destino en un mundo de tormentos y humanas traiciones.',
      'https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
      2019,
      'Fantasia',
      '3',
      'https://revistayume.com/wp-content/uploads/2023/05/190701125354-01-netflix-the-witcher.jpg',
      []
    ),
    new Serie(
      'MOONKNIGHT',
      'Un trabajador de un museo que lucha contra un trastorno de identidad disociativo, recibe los poderes de un dios egipcio de la luna. Pronto descubre que estos poderes pueden ser tanto una bendición como una maldición.',
      'https://m.media-amazon.com/images/M/MV5BYTc5OWNhYjktMThlOS00ODUxLTgwNDQtZjdjYjkyM2IwZTZlXkEyXkFqcGdeQXVyNTA3MTU2MjE@._V1_.jpg',
      2022,
      'Acción',
      '1',
      'https://assets-prd.ignimgs.com/2022/10/26/moon-knight-season-2-1666788735955.jpg',
      []
    ),
    new Serie(
      'VIKINGOS: VALHALLA',
      'Este drama realista recuenta las hazañas del vikingo Ragnar Lothbrok durante la expansión nórdica al retar a un líder falto de visión.',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/unnamed-1642527087.jpg?resize=480:*',
      2013,
      'Drama',
      '6',
      'https://cintilatio.com/wp-content/uploads/2022/03/Vikingos-Valhalla-Destacada.jpg',
      []
    ),
    new Serie(
      'THE SANDMAN',
      'Luego de años de reclusión, el Rey del Sueño emprende un viaje a través de los mundos para recuperar lo que le robaron y restaurar su poder.',
      'https://media.revistagq.com/photos/62f60c7427f926d4f0858853/master/pass/sandman.jpeg',
      2022,
      'Superhéroes',
      '1',
      'https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/10/the-sandman-what-we-know-so-far.jpg',
      []
    ),
    new Serie(
      'PEAKY BLINDERS',
      'Birmingham, 1939. Thomas Shelby es el violento líder de una conocida banda; un jefe del crimen organizado dispuesto a llegar a lo más alto sin importar el precio.',
      'https://i.pinimg.com/736x/d7/65/8f/d7658fac26b701de71f6039bd980341c.jpg',
      2013,
      'Drama',
      '6',
      'https://larepublica.cronosmedia.glr.pe/original/2021/01/19/60077938fdf0f8535159fe62.jpg',
      []
    ),
    new Serie(
      'GAME OF THRONES',
      'En un mundo fantástico y en un contexto medieval varias familias, relativas a la nobleza, se disputan el poder para dominar el territorio ficticio de Poniente (Westeros) y tomar el control de los Siete Reinos desde el Trono de Hierro, lugar donde el rey ejerce el poder.',
      'https://http2.mlstatic.com/D_NQ_NP_883298-MLM47837246496_102021-W.jpg',
      2011,
      'Drama',
      '8',
      'https://t.ctcdn.com.br/w4eMlpxXj05uSSgLMg-shhwuuxQ=/1400x788/smart/i441940.jpeg',
      []
    ),
  ];

  public genero: Genero[] = [
    new Genero('Acción'),
    new Genero('Aventura'),
    new Genero('Fantasia'),
    new Genero('Comedia'),
    new Genero('Drama'),
    new Genero('Misterio'),
    new Genero('Suspenso'),
    new Genero('Terror'),
    new Genero('Familia'),
    new Genero('Crimen'),
  ];

  public episodios: Episodio[] = [
    new Episodio(
      // THE WITCHER EPISODES
      1,
      1,
      'THE WITCHER',
      'Principio del fin',
      'http://rocadeguia.com/wp-content/uploads/2019/12/TheWitcher2_RocadeGuia.jpg',
      'Al llegar a Blaviken, Geralt se topa con habitantes hostiles y un hechicero astuto. Mientras, el ataque de Nilfgaard a Cintra revela el destino de Ciri.',
      '61min',
      'https://www.youtube.com/watch?v=ee91AuJecrM&ab'
    ),
    new Episodio(
      2,
      1,
      'THE WITCHER',
      'Cuatro marcos',
      'https://sciencefiction.com/wp-content/uploads/2019/12/the-witcher-episode-3.jpg',
      'Yennefer descubre cómo escapar de las penurias. Geralt se mete en problemas mientras persigue a un supuesto diablo. Ciri sigue huyendo y busca refugio.',
      '61min',
      'https://www.youtube.com/watch?v=8rAg7nHnDTA&ab'
    ),
    new Episodio(
      3,
      1,
      'THE WITCHER',
      'Luna tricionera',
      'https://kryptonsolid.com/wp-content/uploads/2022/02/t4JRtijXdCzkv3Lgr4LAXU-1200-80-1024x576.jpg',
      'Geralt busca completar la misión de otro brujo en un reino acechado por una bestia feroz. Yennefer logra su objetivo, pero el costo es muy alto.',
      '67min',
      'https://www.youtube.com/watch?v=dij_PPsWtbI&ab'
    ),
    new Episodio(
      4,
      1,
      'THE WITCHER',
      'Banquetes, bastardos y entierros',
      'https://f.ptcdn.info/482/067/000/q36ceeili6umcFmz5qD-o.png',
      'Geralt escolta a Jaskier al banquete de bodas en un nuevo atuendo. Ciri se pierde en un bosque encantado. Yennefer custodia a una mujer y su bebé.',
      '61min',
      'https://www.youtube.com/watch?v=CilMDisTLZU&ab'
    ),
    new Episodio(
      5,
      1,
      'THE WITCHER',
      'Apetitos incontenibles',
      'https://thecinemaholic.com/wp-content/uploads/2019/12/episode-5.png',
      'Yennefer quiere recuperar lo que perdió a pesar de las advertencias. Geralt pone en peligro a Jaskier sin querer. La persecución de Ciri se intensifica.',
      '61min',
      'https://www.youtube.com/watch?v=FwBsFVcTonE&ab'
    ),
    new Episodio(
      6,
      1,
      'THE WITCHER',
      'Especies raras',
      'https://media.thenerdstash.com/wp-content/uploads/2020/02/Beautiful.jpg?auto=compress&fm=pjpg&ixlib=php-1.2.1&s=2b9bc042d8939aa386c7dbff36e007e1',
      'Un hombre misterioso quiere sumar a Geralt a la cacería de un dragón terrible, y la aventura trae una cara conocida. Ciri sospecha de su entorno y hace preguntas.',
      '61min',
      'https://www.youtube.com/watch?v=1GrinnzwV30&ab'
    ),
    new Episodio(
      7,
      1,
      'THE WITCHER',
      'Antes de la caida',
      'https://sm.ign.com/t/ign_in/review/t/the-witche/the-witcher-season-1-episode-7-before-a-fall-review_2c9x.1200.jpg',
      'Mientras la sombra de Nilfgaard avanza sobre el Continente, Yennefer revive el pasado, y el Derecho de la Sorpresa recae sobre Geralt.',
      '61min',
      'https://www.youtube.com/watch?v=ciCRdL9FpFQ&ab'
    ),
    new Episodio(
      8,
      1,
      'THE WITCHER',
      'Mucho más',
      'https://www.comingsoon.net/wp-content/uploads/sites/3/2019/12/Screen-Shot-2019-12-31-at-8.13.25-PM.png',
      'Una horda de monstruos siniestros acorrala a Geralt. Yennefer y sus aliados se preparan para el contraataque. Ciri queda a merced de una desconocida.',
      '61min',
      'https://www.youtube.com/watch?v=IowS8DCuC7E&ab'
    ),

    // LUCIFER EPISODES
    new Episodio(
      1,
      2,
      'LUCIFER',
      'Piloto',
      'https://i.ytimg.com/vi/yJig-yKRc0Q/maxresdefault.jpg',
      '',
      '',
      ''
    ),
  ];

  // public url: string = 'http://127.0.0.1:4100/';
  public url: string = 'https://cd4wd00g-4100.brs.devtunnels.ms/';

  constructor(private _http: HttpClient) {}

  getSeries():Observable<any> {
    return this._http.get(this.url + 'series');
  }

  getPeliculas():Observable<any>{
    return this._http.get(this.url + 'movies')
  }

  getTemporada(titulo: string):Observable<any>{
    return this._http.get(this.url + 'tem/' + titulo);
  }

  getEpisodios(titulo: string):Observable<any>{
    return this._http.get(this.url + 'episodios/' + titulo);
  }
}
