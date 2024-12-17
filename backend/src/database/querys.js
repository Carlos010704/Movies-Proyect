export const querys = {

    getAllmovies: 'SELECT * FROM movies',

    getMovie: 'SELECT * FROM movies WHERE titulo = @titulo',

    getAllseries: 'SELECT * FROM series',

    getAllEpisodios: 'SELECT * FROM episodios WHERE serie = @serie ORDER BY episodio',

    uploadMovie: 'INSERT INTO movies VALUES(@titulo, @sinopsis, @imagen, @year, @genero, @duracion, @video, @post)',

    upload: 'INSERT INTO episodios VALUES(@episodio, @temporada, @serie, @nombre, @imagen, @descripcion, @duracion, @video)',

    getVideo: 'SELECT cap FROM episodios WHERE nombre = @name AND serie = @serie AND temporada = @tem',

    getPost: 'SELECT imagen FROM series WHERE titulo = @titulo',

    getImgDetail: 'SELECT post FROM series WHERE titulo = @titulo',

    getPostMovie: 'SELECT post FROM movies WHERE titulo =  @titulo',

    getTem: 'SELECT temporada FROM episodios WHERE serie = @name GROUP BY temporada',

    getImgCap: 'SELECT imagen FROM episodios WHERE serie = @serie AND episodio = @cap AND temporada = @tem',

    getImgMovie: 'SELECT imagen FROM movies WHERE titulo = @titulo',

    updateImage: 'UPDATE episodios SET imagen = @imagen  WHERE episodio = @episodio AND serie = @serie and temporada = @tem',

    updatePostMovie: 'UPDATE movies SET post = @post WHERE titulo = @titulo',

    updateImageSerie: 'UPDATE series SET imagen = @imagen WHERE titulo = @titulo',

    updateImageMovie: 'UPDATE movies SET imagen = @imagen WHERE titulo = @titulo',

    updatePostSerie: 'UPDATE series SET post = @imagen WHERE titulo = @titulo',

    Movie: 'SELECT video FROM movies WHERE titulo = @titulo'

};