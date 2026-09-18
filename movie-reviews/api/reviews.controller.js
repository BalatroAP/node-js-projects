import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const date = new Date();
      const movieId = req.body.movie_id;
      const review = req.body.review;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };

      await ReviewsDAO.addReview(movieId, userInfo, review, date);

      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const date = new Date();
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const ReviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        review,
        date,
      );

      let { error } = ReviewResponse;

      if (error) {
        res.status.json({ error });
      }

      if (ReviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review. User may not be original poster",
        );
      }
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      await ReviewsDAO.deleteReview(reviewId, userId);
      res.json({ status: "success" });
    } catch (err) {}
  }
}
