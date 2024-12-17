import { get } from "express/lib/response";
import { getConnection, sql, querys } from "../database/export";

import fs, { exists } from "fs";
import path from "path";
import { createGunzip, createGzip } from "zlib";

export const Controller = {
  getAllmovies: async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getAllmovies);

      res.send({ all: result.recordset });
    } catch (error) {
      res.send("Error al realizar la petición...");
    }
  },

  getMovie: async (req, res) => {
    try {
      let { titulo } = req.params;

      const pool = await getConnection();
      const result = await pool
        .request()
        .input("titulo", sql.VarChar, titulo)
        .query(querys.getMovie);

      res.send(result.recordset);
    } catch (error) {
      res.send("Error al realizar la petición...");
    }
  },

  getAllseries: async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getAllseries);

      res.send(result.recordset);
    } catch (error) {
      res.send("Error al realizar la petición...");
    }
  },

  getAllEpisodios: async (req, res) => {
    try {
      const { serie } = req.params;

      const pool = await getConnection();
      const result = await pool
        .request()
        .input("serie", serie)
        .query(querys.getAllEpisodios);

      res.send(result.recordset);
    } catch (error) {
      res.send("Error al realizar la petición...");
    }
  },

  getTem: async (req, res) => {
    try {
      const { name } = req.params;

      const pool = await getConnection();
      const result = await pool
        .request()
        .input("name", name)
        .query(querys.getTem);

      res.send(result.recordset);
    } catch (error) {
      res.send("Error al realizar la petición...");
    }
  },

  getImgCap: async (req, res) => {
    const { serie, cap, tem } = req.params;

    if (!serie || !cap) {
      res.send("Nombre no valido...");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("serie", serie)
          .input("cap", cap)
          .input("tem", tem)
          .query(querys.getImgCap);

        const img = result.recordset[0].imagen;

        const rute = "src/files/" + img;

        fs.exists(rute, (exists) => {
          res.sendFile(path.resolve(rute));
        });
      } catch (error) {
        res.send("Error al realizar la petición...");
      }
    }
  },

  getImgMovie: async (req, res) => {
    const { titulo } = req.params;

    if (!titulo) {
      res.send("Nombre no valido...");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("titulo", titulo)
          .query(querys.getImgMovie);

        const img = result.recordset[0].imagen;

        const rute = "src/files/" + img;

        fs.exists(rute, (exists) => {
          res.sendFile(path.resolve(rute));
        });
      } catch (error) {
        res.send("Error al realizar la petición...");
      }
    }
  },

  upload: async (req, res) => {
    const { filename } = req.file;
    const { ep, temp, serie, name, imagen, desc, duracion } = req.body;

    const file_ext = filename.split(".");
    const ext = file_ext[1];

    if (ext != "mp4") {
      res.send("Extencion invalida");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("episodio", ep)
          .input("temporada", temp)
          .input("serie", serie)
          .input("nombre", name)
          .input("imagen", imagen)
          .input("descripcion", desc)
          .input("duracion", duracion)
          .input("video", filename)
          .query(querys.upload);

        res.send("ok");
      } catch (error) {
        res.send(error);
      }
    }
  },

  cargar: async (req, res) => {
    const { filename } = req.file;
    const { titulo, sinopsis, imagen, year, genero, duracion, post } = req.body;

    const file_ext = filename.split(".");
    const ext = file_ext[1];

    if (ext != "mp4") {
      res.send("Extencion invalida");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("titulo", titulo)
          .input("sinopsis", sinopsis)
          .input("imagen", imagen)
          .input("year", year)
          .input("genero", genero)
          .input("duracion", duracion)
          .input("post", post)
          .input("video", filename)
          .query(querys.uploadMovie);

        res.send("ok");
      } catch (error) {
        res.send(error);
      }
    }
  },

  // cargar: async (req, res) => {
  //   const { filename } = req.file;
  //   const { titulo, sinopsis, imagen, year, genero, duracion, post } = req.body;

  //   const fileName = `${filename}.gz`;

  //   try {
  //     const gzip = createGzip();
  //     const fileZip = fs.createWriteStream(`src/files/videos/${fileName}`);
  //     gzip.pipe(fileZip);

  //     const pool = await getConnection();
  //     const result = await pool
  //       .request()
  //       .input("titulo", titulo)
  //       .input("sinopsis", sinopsis)
  //       .input("imagen", imagen)
  //       .input("year", year)
  //       .input("genero", genero)
  //       .input("duracion", duracion)
  //       .input("post", post)
  //       .input("video", fileName)
  //       .query(querys.uploadMovie);

  //     res.send("ok");
  //   } catch (error) {
  //     res.send(error);
  //   }
  // },

  getVideo: async (req, res) => {
    const { name, serie, tem } = req.params;

    if (!name) {
      res.send("Nombre no valido...");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("name", name)
          .input("serie", serie)
          .input("tem", tem)
          .query(querys.getVideo);

        const cap = result.recordset[0].cap;

        // const file = req.params.nam;
        const rute = "src/files/" + cap;

        fs.exists(rute, (exists) => {
          res.sendFile(path.resolve(rute));
        });
      } catch (error) {
        res.send(error);
      }
    }
  },

  Movie: async (req, res) => {
    const { titulo } = req.params;

    if (!titulo) {
      res.send("Titulo no valido...");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("titulo", titulo)
          .query(querys.Movie);

        const movie = result.recordset[0].video;

       const rute = "src/files/" + movie;

        fs.exists(rute, (exist) => {
          res.sendFile(path.resolve(rute));
        });
      } catch (error) {
        console.log(error);
      }
    }
  },

  getPost: async (req, res) => {
    const titulo = req.params.nam;

    if (!titulo) {
      res.send("Nombre no valido...");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("titulo", titulo)
          .query(querys.getPost);

        const post = result.recordset[0].imagen;

        const rute = "src/files/" + post;

        fs.exists(rute, (exists) => {
          res.sendFile(path.resolve(rute));
        });
      } catch (error) {
        res.send(error);
      }
    }
  },

  getimgDetail: async (req, res) => {
    const titulo = req.params.nam;

    if (!titulo) {
      res.send("Nombre no valido...");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("titulo", titulo)
          .query(querys.getImgDetail);

        const post = result.recordset[0].post;

        const rute = "src/files/" + post;

        fs.exists(rute, (exists) => {
          res.sendFile(path.resolve(rute));
        });
      } catch (error) {
        res.send(error);
      }
    }
  },

  getPostMovie: async (req, res) => {
    const { titulo } = req.params;

    if (!titulo) {
      res.send("Nombre no valido...");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("titulo", titulo)
          .query(querys.getPostMovie);

        const post = result.recordset[0].post;

        const rute = "src/files/" + post;

        fs.exists(rute, (exists) => {
          res.sendFile(path.resolve(rute));
        });
      } catch (error) {
        res.send(error);
      }
    }
  },

  updateCapImage: async (req, res) => {
    const { filename } = req.file;

    const { serie, cap, tem } = req.params;

    const file_ext = filename.split(".");
    const ext = file_ext[1];

    if (ext != "jpg" && ext != "jepg" && ext != "png") {
      res.send("Extencion invalida");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("serie", serie)
          .input("episodio", cap)
          .input("tem", tem)
          .input("imagen", filename)
          .query(querys.updateImage);

        res.send("ok");
      } catch (error) {
        res.send(error);
      }
    }
  },

  updateImageSerie: async (req, res) => {
    const { filename } = req.file;

    const { titulo } = req.params;

    const file_ext = filename.split(".");
    const ext = file_ext[1];

    if (ext != "jpg" && ext != "jepg" && ext != "png") {
      res.send("Extencion invalida");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("titulo", titulo)
          .input("imagen", filename)
          .query(querys.updateImageSerie);

        res.send("ok");
      } catch (error) {
        res.send(error);
      }
    }
  },

  moviePost: async (req, res) => {
    const { filename } = req.file;

    const { titulo } = req.params;

    const file_ext = filename.split(".");
    const ext = file_ext[1];

    if (ext != "jpg" && ext != "jepg" && ext != "png") {
      res.send("Extencion invalida");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("titulo", titulo)
          .input("post", filename)
          .query(querys.updatePostMovie);

        res.send("ok");
      } catch (error) {
        res.send(error);
      }
    }
  },

  updatePostSerie: async (req, res) => {
    const { filename } = req.file;

    const { titulo } = req.params;

    const file_ext = filename.split(".");
    const ext = file_ext[1];

    if (ext != "jpg" && ext != "jepg" && ext != "png") {
      res.send("Extencion invalida");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("titulo", titulo)
          .input("imagen", filename)
          .query(querys.updatePostSerie);

        res.send("ok");
      } catch (error) {
        res.send(error);
      }
    }
  },

  updateImageMovie: async (req, res) => {
    const { filename } = req.file;

    const { titulo } = req.params;

    const file_ext = filename.split(".");
    const ext = file_ext[1];

    if (ext != "jpg" && ext != "jepg" && ext != "png") {
      res.send("Extencion invalida");
    } else {
      try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .input("titulo", titulo)
          .input("imagen", filename)
          .query(querys.updateImageMovie);

        res.send("ok");
      } catch (error) {
        res.send(error);
      }
    }
  },
};
