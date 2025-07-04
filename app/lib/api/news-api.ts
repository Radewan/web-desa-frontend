import axios from "axios";

export class NewsApi {
  static async getAll() {
    return await axios.get("http://localhost:8080/news/");
  }

  static async get(newsApi: string) {
    return await axios.get(`http://localhost:8080/news/${newsApi}`);
  }
}
