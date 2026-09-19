import axios from "axios";

export default new (class MovieDataService {
  constructor() {
    this.link = "http://localhost:8080/api/v1/movies";
  }
  async getAll(page = 0) {
    return await axios.get(`${this.link}?page=${page}`);
  }

  async get(id) {
    return await axios.get(this.link + "/id/" + id);
  }

  find(query, by = "title", page = 0) {
    return axios.get(`${this.link}?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return axios.post(`${this.link}/review`, data);
  }

  updateReview(data) {
    return axios.put(`${this.link}/review`, data);
  }

  deleteReview(id, userId) {
    return axios.delete(`${this.link}/review`, {
      data: {
        review_id: id,
        user_id: userId,
      },
    });
  }

  getRating() {
    return axios.get(`${this.link}/ratings`);
  }
})();
