import axios from "axios";

export class EventApi {
  static async getAll() {
    return await axios.get("http://localhost:8080/agenda/");
  }

  static async get(eventId: string) {
    return await axios.get(`http://localhost:8080/agenda/${eventId}`);
  }
}
