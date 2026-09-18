import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

let movies;

export default class MoviesDAO {
  static async injectDB(conn) {
    if (movies) {
      return;
    }

    try {
      movies = await conn.collection("movies");
    } catch (err) {
      console.error(err);
    }
  }

  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    let cursor;
    let query;
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } };
      } else if ("rated" in filters) {
        query = { rated: { $eq: filters["rated"] } };
      }
    }

    try {
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);
      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);
      return { moviesList, totalNumMovies };
    } catch (err) {
      console.error(`Unable to issue find command, ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }

  static async getRatings() {
    let ratings = [];
    try {
      ratings = await movies.distinct("rated");
      return ratings;
    } catch (err) {
      console.error(`unable to get ratings, ${err}`);
      return ratings;
    }
  }

  static async getMoviesById(id) {
    try {
      return await movies
        .aggregate([
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "reviews",
              localField: "_id",
              foreignField: "movie_id",
              as: "reviews",
            },
          },
        ])
        .next();
    } catch (err) {
      console.error(`something went wrong in getMovieById: ${err}`);
      throw err;
    }
  }
}
