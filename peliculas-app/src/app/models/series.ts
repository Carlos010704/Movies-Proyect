export class Serie {
    constructor(
        public titulo: string,
        public sinopsis: string,
        public imagen: string,
        public year: number,
        public genero: string,
        public temporadas: string,
        public post: string,
        public episodios: any[]
    ){}
}