import axios from "axios";

export default axios.create({
  baseURL: "https://api.github.com",
  params: {
    Authorization: "c19665299872ef7f67b64223d98a4d219c720705",
  },
});
