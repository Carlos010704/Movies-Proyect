import { Router } from "express";
import { Controller } from "../controllers/movies.controller";

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


const md_upload = multer({
  storage: storage,
  limits: { fileSize: 2024 * 1024 * 1024 }
});

// CREAR LAS RUTAS
const router = Router();


// -------  MOVIES  --------

router.get("/movies", Controller.getAllmovies); // Obtener todas las peliculas.
router.get("/movie/:titulo", Controller.getMovie); // Obtener pelicula.
router.get("/img-movie/:titulo", Controller.getImgMovie); // Obtener imagen de la pelicula.
router.get("/post-movie/:titulo", Controller.getPostMovie) // Obtener post pelicula
router.get('/getMovie/:titulo', Controller.Movie); // Obtener pelicula/video.



// -------  SERIES  --------
router.get("/series", Controller.getAllseries); // Obtener todas las series.
router.get("/episodios/:serie", Controller.getAllEpisodios); // Obtener todos los episodios.
router.get("/get-video/:serie/:tem/:name", Controller.getVideo); // Obtener capitulo
router.get("/get-post/:nam", Controller.getPost); // Obtener img seriep
router.get("/get-imgDetail/:nam", Controller.getimgDetail); // Obtener post serie
router.get("/getImgCap/:serie/:cap/:tem", Controller.getImgCap); // Obtener imagen del capitulo



// -------  CARGAR INFORMACIÓN  --------
router.post("/upload", md_upload.single("file"), Controller.upload); //  Cargar toda la informacion del episodio excepto la imagen.

router.post("/serie/:serie/:tem/:cap", md_upload.single('image'),  Controller.updateCapImage); // Actauliza imagen del capitulo.

router.post("/serie/:titulo", md_upload.single('image'),  Controller.updateImageSerie); // Actauliza imagen de la serie.

router.post("/post/:titulo", md_upload.single('file'),  Controller.updatePostSerie); // Actauliza post de la serie.

router.post("/movie/:titulo", md_upload.single('file'),  Controller.updateImageMovie); // Actauliza imagen de la pelicula.

router.post("/movie-post/:titulo", md_upload.single('file'), Controller.moviePost); // Actualizar Post de la pelicual.

router.post("/cargar", md_upload.single('file'), Controller.cargar); //  Cargar toda la informacion de una pelicula excepto la imagen.

// --------- EXTRAS -------------
router.get("/tem/:name", Controller.getTem)


export default router;
