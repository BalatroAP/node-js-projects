import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }

    try {
      reviews = await conn.collection("reviews");
    } catch (err) {
      console.error(
        `unable to establish connection handle in reviewDAO: ${err}`,
      );
    }
  }

  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        review: review,
        movie_id: new ObjectId(movieId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (err) {
      console.error(`unable to post review: ${err}`);
      return { error: err };
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: new ObjectId(reviewId) },
        { $set: { review: review, date: date } },
      );
      return updateResponse;
    } catch (err) {
      console.error(`unable to update review: ${err}`);
      return { error: err };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (err) {
      console.error(`unable to delete review: ${err}`);
      return { error: err };
    }
  }
}
