import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./server.js";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

async function main() {
  dotenv.config();

  const port = process.env.PORT || 8000;

  try {
    const client = await mongoose.createConnection(process.env.URI, {
      dbName: process.env.MOVIEREVIEWS_NS,
    });
    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
}

main().catch(console.error);
