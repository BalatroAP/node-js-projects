let movies;

export default class MoviesDAO {
  static async injectDB(conn) {
    if (movies) {
      return;
    }

    movies = conn.collection("movies");
    try {
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
}
