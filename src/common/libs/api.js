import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const SORT_OPTIONS = {
  LATEST: "latest",
  OLDEST: "oldest",
  MOST_VIEWED: "most_viewed",
};

export const experienceApi = {
  async getAll({ page = 1, limit = 20, search = "", sort = SORT_OPTIONS.LATEST } = {}) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
    });

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const { data } = await api.get(`/experiences?${params.toString()}`);
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`/experiences/${id}`);
    return data;
  },

  async create({ content, website }) {
    const { data } = await api.post("/experiences", { content, website });
    return data;
  },
};

export const fetcher = (url) => api.get(url).then((res) => res.data);

export default experienceApi;
