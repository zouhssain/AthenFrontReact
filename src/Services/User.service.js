import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/UC/users");
  }

  get(id) {
    return http.get(`/US/${id}`);
  }

  create(data) {
    return http.post("/add", data);
  }
}

export default new DataService();